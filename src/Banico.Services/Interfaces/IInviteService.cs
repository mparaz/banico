using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Banico.Services.Interfaces
{
    public interface IInviteService
    {
        Task<int> Add(string url, string inviter, string emails);
        Task<string> IsInvited(string email, string code);
    }
}