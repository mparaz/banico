using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json.Linq;
using System.Diagnostics;
using Banico.Core.Entities;

namespace Banico.Services
{
    public static class Utilities
    {
        public static async Task<AppUser> GetUser(Controller controller, UserManager<AppUser> userManager)
        {
            if (controller.User == null)
            {
                var user = new AppUser();

                return user;
            }
            else
            {
                var username = controller.User.Identity.Name;
                var user = new AppUser();

                if (string.IsNullOrEmpty(username))
                {
                    return user;
                }

                user = await userManager.FindByNameAsync(controller.User.Identity.Name);

                if (user == null)
                {
                    user = new AppUser();
                    return user;
                }
                else
                {
                    return user;
                }
            }
        }
    }
}