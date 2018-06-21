
using Banico.Core.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Banico.Identity.Data
{
    public class AppIdentityDbContext : IdentityDbContext<AppUser,AppRole, string>
    {
        private readonly bool isMigration = false;

        public AppIdentityDbContext()
        {
            isMigration = true;
        }

        public AppIdentityDbContext(DbContextOptions options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (isMigration)
            {
                var connectionStringBuilder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder { DataSource = "banico-identity.db" };
                var connectionString = connectionStringBuilder.ToString();

                optionsBuilder.UseSqlite(connectionString);
            }
        }

        public DbSet<Customer> Customers { get; set; }
    }
}
