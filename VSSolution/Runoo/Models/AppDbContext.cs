using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Models
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public DbSet<Language> Languages { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<TranslateBook> TranslateBooks { get; set; }
        public DbSet<BookState> BookStates { get; set; }
        public DbSet<ChapterState> ChapterStates { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<BookComment> BookComments { get; set; }
        public DbSet<ChapterComment> ChapterComments { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
        public DbSet<Chapter> Chapters { get; set; }
        public DbSet<TeamMemberRole> TeamMemberRoles { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }
        public DbSet<TeamInviteNotification> TeamInviteNotifications { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TeamInviteNotification>()
               .HasOne(c => c.Team)
               .WithMany(c => c.Invites)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TeamInviteNotification>()
               .HasOne(c => c.TeamMember)
               .WithMany(c => c.Invites)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ChapterComment>()
               .HasOne(c => c.Chapter)
               .WithMany(c => c.Comments)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comment>()
               .HasOne(c => c.User)
               .WithMany(c => c.Comments)
               .OnDelete(DeleteBehavior.Restrict);
            
            modelBuilder.Entity<TranslateBook>()
                        .HasOne(e => e.OriginalLanguage)
                        .WithMany(e => e.TranslateBooks)
                        .HasForeignKey(e => e.OriginalLanguageTK)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ChapterState>().HasData(
                new ChapterState[]
                {
                    new ChapterState { TK = "work"},
                    new ChapterState { TK = "editing"},
                    new ChapterState { TK = "complete"}
                });
            modelBuilder.Entity<Language>().HasData(
                new Language[]
                {
                new Language { TK = "en"},
                new Language { TK = "ru"},
                new Language { TK = "ua"}
                });
            modelBuilder.Entity<BookState>().HasData(
                new BookState[]
                {
                new BookState { TK = "free"},
                new BookState { TK = "work"},
                new BookState { TK = "pause"},
                new BookState { TK = "complete"}
                });
            modelBuilder.Entity<TeamMemberRole>().HasData(
                new TeamMemberRole[]
                {
                new TeamMemberRole { TK = "head"},
                new TeamMemberRole { TK = "deputy-head"},
                new TeamMemberRole { TK = "member"}
                });

            base.OnModelCreating(modelBuilder);
        }
    }
}
