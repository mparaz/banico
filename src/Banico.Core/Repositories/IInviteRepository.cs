using System.Threading.Tasks;
using Banico.Core.Entities;

namespace Banico.Core.Repositories
{
    public interface IInviteRepository
    {
        Task<int> Add(Invite invite);
        Task<string> IsInvited(string email, string code);
    }
}