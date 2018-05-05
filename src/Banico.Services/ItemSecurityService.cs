using Banico.Core.Entities;
using Banico.Services.Interfaces;

namespace Banico.Services
{
    public class ItemSecurityService : IItemSecurityService
    {
        public ISuperAdminService _superAdminService;

        public ItemSecurityService(ISuperAdminService superAdminService)
        {
            _superAdminService = superAdminService;
        }

        public bool IsAuthorized(Item item, AppUser user)
        {
            if (item.CreatedBy == user.Id)
            {
                return true;
            }

            if (_superAdminService.IsSuperAdminEmail(user.Email))
            {
                return true;
            }

            return false;
        }
    }
}