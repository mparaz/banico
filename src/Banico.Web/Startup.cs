using System;
using System.Net;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using FluentValidation.AspNetCore;
using Banico.Core.Entities;
using Banico.Core.Repositories;
using Banico.Data;
using Banico.Data.Repositories;
using Banico.Identity;
using Banico.Identity.Extensions;
using Banico.Services;
using Banico.Services.Interfaces;

namespace Banico.Web
{
    public class Startup
    {
        private bool developmentEnvironment = false;

        private IdentityStartup identityStartup;

        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
 
             if (env.IsDevelopment())
            {
                this.developmentEnvironment = true;
            }

            identityStartup = new IdentityStartup(configuration, this.developmentEnvironment);
       }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            
            // Add framework services.
            string appDbContextConnectionString = Configuration.GetConnectionString("AppDbContext");

            if ((!String.IsNullOrEmpty(appDbContextConnectionString)) && 
                (!this.developmentEnvironment))
            {
                services.AddDbContext<AppDbContext>(options =>
                    options.UseSqlServer(appDbContextConnectionString,
                    optionsBuilder => optionsBuilder.MigrationsAssembly("Banico.Data")));
            }
            else
            {
                var connectionStringBuilder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder { DataSource = "banico.db" };
                appDbContextConnectionString = connectionStringBuilder.ToString();
                services.AddDbContext<AppDbContext>(options =>
                    options.UseSqlite(appDbContextConnectionString,
                    optionsBuilder => optionsBuilder.MigrationsAssembly("Banico.Data")));
            }
      
            services.Configure<AuthMessageSenderOptions>(Configuration);
            //services.AddAntiforgery(opts => opts.HeaderName = "X-XSRF-Token");
            services.AddAntiforgery(opts =>
                {
                    //opts.Cookie.Name = "XSRF-TOKEN";
                    opts.HeaderName = "X-XSRF-TOKEN";
                }
            );

            identityStartup.ConfigureServices(services);
            
            services.AddSingleton<IConfiguration>(Configuration);

            services.AddScoped<IInviteRepository, InviteRepository>();
            services.AddScoped<ISectionRepository, SectionRepository>();
            services.AddScoped<ISectionItemRepository, SectionItemRepository>();
            services.AddScoped<IItemRepository, ItemRepository>();

            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
            services.AddScoped<IInviteService, InviteService>();
            services.AddScoped<ISuperAdminService, SuperAdminService>();
            services.AddScoped<IItemSecurityService, ItemSecurityService>();

            // services.AddMvc(opts =>
            // {
            //     opts.Filters.AddService(typeof(AngularAntiforgeryCookieResultFilter));
            // })
            services.AddMvc()
            .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>())
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
            .AddJsonOptions(
                options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            // services.AddTransient<AngularAntiforgeryCookieResultFilter>();
            
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IAntiforgery antiforgery)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(
                    builder =>
                    {
                    builder.Run(
                        async context =>
                        {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        context.Response.Headers.Add("Access-Control-Allow-Origin", "*");

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message).ConfigureAwait(false);
                        }
                        });
                    });
            }

            app.UseAuthentication();
            
            app.Use(next => context =>
                {
                    string path = context.Request.Path.Value;
                    
                    if (path.ToLower().Contains("/account")) {
            //         if (
            // string.Equals(path, "/", StringComparison.OrdinalIgnoreCase) ||
            // string.Equals(path, "/index.html", StringComparison.OrdinalIgnoreCase)) {
                        // The request token can be sent as a JavaScript-readable cookie, 
                        // and Angular uses it by default.
                        var tokens = antiforgery.GetAndStoreTokens(context);
                        context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, 
                            new CookieOptions() { HttpOnly = false });
                    }

                    return next(context);
                }
            );

            app.UseHttpsRedirection();
            // app.UseMiddleware<AntiForgeryMiddleware>("XSRF-TOKEN");
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseJwtTokenMiddleware();
            app.UseSpaStaticFiles();
            app.UseCookiePolicy();
            app.UseGraphiQl();
            
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                // see https://docs.microsoft.com/en-us/aspnet/core/spa/angular?view=aspnetcore-2.1&tabs=visual-studio                
    
                spa.UseSpaPrerendering(options =>
                {
                    options.BootModulePath = $"{spa.Options.SourcePath}/dist/server/main.js";
                    options.BootModuleBuilder = env.IsDevelopment()
                        ? new AngularCliBuilder(npmScript: "build:ssr")
                        : null;
                    options.ExcludeUrls = new[] { "/sockjs-node" };
                });

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }

    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseAntiforgeryTokenMiddleware(this IApplicationBuilder builder, string requestTokenCookieName)
        {
            return builder.UseMiddleware<AntiForgeryMiddleware>(requestTokenCookieName);
        }
    }

    public class AntiForgeryMiddleware
    {
        private readonly RequestDelegate next;
        private readonly string requestTokenCookieName;
        private readonly string[] httpVerbs = new string[] { "GET", "HEAD", "OPTIONS", "TRACE" };

        public AntiForgeryMiddleware(RequestDelegate next, string requestTokenCookieName)
        {
            this.next = next;
            this.requestTokenCookieName = requestTokenCookieName;
        }

        public async Task Invoke(HttpContext context, IAntiforgery antiforgery)
        {
            if (httpVerbs.Contains(context.Request.Method, StringComparer.OrdinalIgnoreCase))
            {
                if (context.User.Identity.IsAuthenticated) {
                    var tokens = antiforgery.GetAndStoreTokens(context);
                
                    context.Response.Cookies.Append(requestTokenCookieName, tokens.RequestToken, new CookieOptions()
                    {
                        HttpOnly = false
                    });
                }
            }      

            await next.Invoke(context);
        }
    }
}
