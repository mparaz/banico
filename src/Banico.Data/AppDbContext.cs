using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Banico.Core.Entities;

namespace Banico.Data
{
    public class AppDbContext : DbContext
    {
        private readonly bool isMigration = false;
        public string ConnectionString = String.Empty;

        public AppDbContext()
        {
            isMigration = true;
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (isMigration)
            {
                var connectionStringBuilder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder { DataSource = "banico.db" };
                var connectionString = connectionStringBuilder.ToString();

                optionsBuilder.UseSqlite(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            // builder.Entity<AppUser>(i => {
            //     i.HasKey(x => x.Id);
            // });

            // builder.Entity<IdentityUserRole<int>>()
            //     .HasKey(p => new { p.UserId, p.RoleId});
                
            // builder.Entity<AppUser>()
            //     .HasMany(e => e.Claims)
            //     .WithOne()
            //     .HasForeignKey(e => e.UserId)
            //     .IsRequired()
            //     .OnDelete(DeleteBehavior.Cascade);

            // builder.Entity<AppUser>()
            //     .HasMany(e => e.Logins)
            //     .WithOne()
            //     .HasForeignKey(e => e.UserId)
            //     .IsRequired()
            //     .OnDelete(DeleteBehavior.Cascade);

            // builder.Entity<AppUser>()
            //     .HasMany(e => e.Roles)
            //     .WithOne()
            //     .HasForeignKey(e => e.UserId)
            //     .IsRequired()
            //     .OnDelete(DeleteBehavior.Cascade);
         }

        //List of DB Models - Add your DB models here
        public DbSet<User> User { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<SectionItem> SectionItems { get; set; }
        public DbSet<ContentItem> ContentItems { get; set; }
        public DbSet<Invite> Invites { get; set; }
    }
}
