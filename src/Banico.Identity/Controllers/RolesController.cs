using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banico.Core.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Banico.Identity.Controllers
{
    [Authorize(Policy="SuperAdmin")]
    public class RolesController : Controller
    {
        private readonly RoleManager<AppRole> roleManager;
        private readonly IConfiguration _configuration;

        public RolesController(RoleManager<AppRole> roleManager,
            IConfiguration configuration)
        {
            this.roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<List<AppRole>> GetRoles()
        {
            var result = roleManager.Roles.ToList();
            return result;
        }

        [HttpGet]
        public async Task<AppRole> GetRole(string id)
        {
            if (!String.IsNullOrEmpty(id))
            {
                return await roleManager.FindByIdAsync(id);
            }
            return new AppRole();
        }

        [HttpPost]
        public async Task<IActionResult> AddEditRole(string id, [FromBody]AppRole role)
        {
            if (string.IsNullOrEmpty(id)) 
            {
                role.CreatedDate = DateTime.UtcNow;
                await roleManager.CreateAsync(role);
            } else
            {
                var exists = await roleManager.FindByIdAsync(id);
                if (exists != null) {
                    await roleManager.UpdateAsync(role);
                } else {
                    return BadRequest(role);
                }
            }

            return Ok(role);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteRole(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                AppRole role = await roleManager.FindByIdAsync(id);
                if (role != null)
                {
                    IdentityResult roleRuslt = roleManager.DeleteAsync(role).Result;
                    if (roleRuslt.Succeeded)
                    {
                        return Ok(id);
                    }
                }
                }
            return BadRequest(id);
        }
    }
}
