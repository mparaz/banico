using System;
using System.Net;
using System.Text;
using Banico.Identity.Auth;
using Banico.Identity.Data;
using Banico.Identity.Helpers;
using Banico.Identity.Models;
using Banico.Core.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;


namespace Banico.Identity
{
  public class IdentityStartup
  {
    private bool developmentEnvironment = false;
    private const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH"; // todo: get this from somewhere secure
    private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

    public IdentityStartup(IConfiguration configuration, bool developmentEnvironment)
    {
      Configuration = configuration;
      this.developmentEnvironment = developmentEnvironment;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      // Add framework services.
      string appDbContextConnectionString = Configuration.GetConnectionString("AppIdentityDbContext");

      if ((!String.IsNullOrEmpty(appDbContextConnectionString)) && 
          (!(this.developmentEnvironment)))
      {
          services.AddDbContext<AppIdentityDbContext>(options =>
              options.UseSqlServer(appDbContextConnectionString,
              optionsBuilder => optionsBuilder.MigrationsAssembly("Banico.Identity")));
      }
      else
      {
          var connectionStringBuilder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder { DataSource = "banico-identity.db" };
          appDbContextConnectionString = connectionStringBuilder.ToString();
          services.AddDbContext<AppIdentityDbContext>(options =>
              options.UseSqlite(appDbContextConnectionString,
              optionsBuilder => optionsBuilder.MigrationsAssembly("Banico.Identity")));
      }

      services.AddSingleton<IJwtFactory, JwtFactory>();

      // Register the ConfigurationBuilder instance of FacebookAuthSettings
      services.Configure<FacebookAuthSettings>(Configuration.GetSection(nameof(FacebookAuthSettings)));

      services.TryAddTransient<IHttpContextAccessor, HttpContextAccessor>();

      // jwt wire up
      // Get options from app settings
      var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

      // Configure JwtIssuerOptions
      services.Configure<JwtIssuerOptions>(options =>
      {
        options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
        options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
        options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
      });

      var tokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuer = true,
        ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

        ValidateAudience = true,
        ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = _signingKey,

        RequireExpirationTime = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
      };

      services.AddAuthentication(options =>
      {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

      }).AddJwtBearer(configureOptions =>
      {
        configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
        configureOptions.TokenValidationParameters = tokenValidationParameters;
        configureOptions.SaveToken = true;
      });

      // api user claim policy
      services.AddAuthorization(options =>
      {
        options.AddPolicy("ApiUser", policy => policy.RequireClaim(Constants.Strings.JwtClaimIdentifiers.Rol, Constants.Strings.JwtClaims.ApiAccess));
      });

      // add identity
      var builder = services.AddIdentity<AppUser, AppRole>(o =>
      {
        // configure identity options
        o.Password.RequireDigit = false;
        o.Password.RequireLowercase = false;
        o.Password.RequireUppercase = false;
        o.Password.RequireNonAlphanumeric = false;
        o.Password.RequiredLength = 6;
      });
      // builder = new IdentityBuilder(builder.UserType, typeof(AppRole), builder.Services);
      builder.AddSignInManager<SignInManager<AppUser>>();
      builder.AddEntityFrameworkStores<AppIdentityDbContext>().AddDefaultTokenProviders();

      services.AddAutoMapper();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseMvc(routes =>
      {
          routes.MapRoute(
              name: "api",
              template: "api/{controller}/{action=Index}");
      });
    }
  }
}
