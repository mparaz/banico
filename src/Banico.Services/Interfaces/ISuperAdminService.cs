using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Banico.Services.Interfaces
{
    public interface ISuperAdminService
    {
        bool IsSuperAdminEmail(string email);
        Task<bool> IsSuperAdmin(IPrincipal user);
    }
}