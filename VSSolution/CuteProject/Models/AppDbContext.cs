using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CuteProject.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Book> Books { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Unique book title
            modelBuilder.Entity<Book>().HasIndex(u => u.Title).IsUnique();
        }
    }
}
