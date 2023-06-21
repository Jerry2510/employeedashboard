using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Models
{
    public class UserDbContext: DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext>options):base(options)
        {
            
        }
        public DbSet<UserModel>userModels { get; set; }

        public DbSet<EmployeeModel>employeeModels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeModel>().ToTable("employee");
            modelBuilder.Entity<UserModel>().ToTable("users");

        }
    }
}
