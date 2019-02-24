using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Models.Books;
using Server.Models.Comments;
using Server.Models.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public DbSet<Book> Books { get; set; }
        //public DbSet<TranslateBook> TranslateBooks { get; set; }
        public DbSet<Chapter> Chapters { get; set; }

        //public DbSet<Team> Teams { get; set; }
        
        //public DbSet<BookState> BookStates { get; set; }
        //public DbSet<TranslateBookState> TranslateBookStates { get; set; }

        public DbSet<Bookmark> Bookmarks { get; set; }

        //public DbSet<Genre> Genres { get; set; }
        //public DbSet<Author> Authors { get; set; }
        //public DbSet<Language> Languages { get; set; }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<BookComment> BookComments { get; set; }
        public DbSet<ChapterComment> ChapterComments { get; set; }
        
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChapterComment>()
               .HasOne(c => c.Chapter)
               .WithMany(c => c.Comments)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comment>()
               .HasOne(c => c.Parent)
               .WithMany(c => c.Children)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Parent)
                .WithMany(c => c.Children)
                .HasForeignKey(c => c.ParentId)
                .IsRequired(false);
            
            //modelBuilder.Entity<BookGenre>()
            //    .HasKey(t => new { t.BookId, t.GenreId });

            //modelBuilder.Entity<BookGenre>()
            //    .HasOne(sc => sc.Book)
            //    .WithMany(s => s.Genres)
            //    .HasForeignKey(sc => sc.BookId);

            //modelBuilder.Entity<BookGenre>()
            //    .HasOne(sc => sc.Genre)
            //    .WithMany(c => c.Books)
            //    .HasForeignKey(sc => sc.GenreId);
            //modelBuilder.Entity<Language>().HasData(
            //    new Language[]
            //    {
            //    new Language { TK = "eng"},
            //    new Language { TK = "rus"},
            //    new Language { TK = "ukr"}
            //    });

            base.OnModelCreating(modelBuilder);
        }
    }
}
