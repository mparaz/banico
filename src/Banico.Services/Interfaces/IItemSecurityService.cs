using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Banico.Core.Entities;

namespace Banico.Services.Interfaces
{
    public interface IItemSecurityService
    {
        bool IsAuthorized(Item item, AppUser user);
    }
}