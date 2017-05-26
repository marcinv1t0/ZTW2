using Microsoft.EntityFrameworkCore;
using CarMarket.Entities;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace CarMarket.Infrastructure
{
    public class CarMarketContext : DbContext
    {
       
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Error> Errors { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<View> Views { get; set; }

        public CarMarketContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                entity.Relational().TableName = entity.DisplayName();
            }

            

            // User
            modelBuilder.Entity<User>().Property(u => u.Username).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<User>().Property(u => u.Email).IsRequired().HasMaxLength(200);
            modelBuilder.Entity<User>().Property(u => u.HashedPassword).IsRequired().HasMaxLength(200);
            modelBuilder.Entity<User>().Property(u => u.Salt).IsRequired().HasMaxLength(200);

            // UserRole
            modelBuilder.Entity<UserRole>().Property(ur => ur.UserId).IsRequired();
            modelBuilder.Entity<UserRole>().Property(ur => ur.RoleId).IsRequired();

            // Role
            modelBuilder.Entity<Role>().Property(r => r.Name).IsRequired().HasMaxLength(50);
        }
    }
}
