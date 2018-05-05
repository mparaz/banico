using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Data.Repositories
{
    public class InviteRepository : IInviteRepository
    {
        public AppDbContext DbContext { get; set; }

        public InviteRepository(AppDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public async Task<int> Add(Invite invite)
        {
            this.DbContext.Invites.Add(invite);
            return await this.DbContext.SaveChangesAsync();
        }

        public async Task<string> IsInvited(string email, string code)
        {
            var invites = from i in this.DbContext.Invites
                where (i.Email == email) && (i.Code == code)
                select i;

            var invite = (await invites.FirstOrDefaultAsync());

            if (invite != null)
            {
                return invite.Inviter;
            }

            return string.Empty;
        }
    }
}