using System;
using System.Net;
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
            services.AddAntiforgery(opts => opts.HeaderName = "X-XSRF-Token");

            identityStartup.ConfigureServices(services);
            
            services.AddSingleton<IConfiguration>(Configuration);

            services.AddScoped<IInviteRepository, InviteRepository>();
            services.AddScoped<ISectionTypeRepository, SectionTypeRepository>();
            services.AddScoped<ISectionRepository, SectionRepository>();
            services.AddScoped<IItemRepository, ItemRepository>();

            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
            services.AddScoped<IInviteService, InviteService>();
            services.AddScoped<ISuperAdminService, SuperAdminService>();
            services.AddScoped<IItemSecurityService, ItemSecurityService>();

            services.AddMvc()
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>())
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
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

            app.UseDefaultFiles();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseCookiePolicy();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseAuthentication();

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                // see https://docs.microsoft.com/en-us/aspnet/core/spa/angular?view=aspnetcore-2.1&tabs=visual-studio
                
                spa.UseSpaPrerendering(options =>
                {
                    options.BootModulePath = $"{spa.Options.SourcePath}/dist-server/main.bundle.js";
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
}
