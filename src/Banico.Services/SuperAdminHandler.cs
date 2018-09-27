using System.Threading.Tasks;
//using System.Web.Http.Dependencies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication;

using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
//using Microsoft.Extensions.Logging.AzureAppServices;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

//using Microsoft.ApplicationInsights.AspNetCore;
using Microsoft.AspNetCore.NodeServices;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
// using AspNet.Security.OAuth.LinkedIn;

// using Microsoft.AspNetCore.Http;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.DependencyInjection.Abstractions;

namespace Banico.Services
{
    public class SuperAdminHandler : AuthorizationHandler<SuperAdminRequirement>
    {
        private readonly IServiceProvider _serviceProvider;

        public SuperAdminHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, SuperAdminRequirement requirement)
        {
            IConfigurationRoot configuration = _serviceProvider.GetService<IConfigurationRoot>();

            if (context.User != null)
            {
                if (context.User.Identity != null)
                {
                    string email = ((System.Security.Claims.ClaimsIdentity)context.User.Identity).
                        FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name").Value;
            
                    string superAdminConfig = configuration["SuperAdmins"];
                    string[] superAdmins = superAdminConfig.Split(',');
                    foreach (string superAdmin in superAdmins)
                    {
                        if (email == superAdmin)
                        {
                            context.Succeed(requirement);
                        }
                    }
                }
                else
                {
                    Console.WriteLine("CONTEXT.USER.IDENTITY IS NULL!");
                }
            }
            else
            {
                Console.WriteLine("CONTEXT.USER IS NULL!");
            }

            return Task.CompletedTask;
        }
    }
}