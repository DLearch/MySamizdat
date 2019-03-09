using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Models.Books;
using Server.Models.Comments;
using Server.Models.Notification;
using Server.Models.Team;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<TranslateBook> TranslateBooks { get; set; }
        public DbSet<Chapter> Chapters { get; set; }

        public DbSet<Team.Team> Teams { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }
        public DbSet<TeamMemberRole> TeamMemberRoles { get; set; }
        public DbSet<TeamMemberToTeamMemberRole> TeamMembersToTeamMemberRoles { get; set; }
        
        public DbSet<Author> Authors { get; set; }
        public DbSet<Language> Languages { get; set; }

        public DbSet<Notification.Notification> Notifications { get; set; }
        public DbSet<TeamInviteNotification> TeamInviteNotifications { get; set; }

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
            
            modelBuilder.Entity<Bookmark>()
                .HasKey(t => new { t.BookId, t.UserId });

            modelBuilder.Entity<Bookmark>()
                .HasOne(pt => pt.Book)
                .WithMany(p => p.Bookmarks)
                .HasForeignKey(pt => pt.BookId);

            modelBuilder.Entity<Bookmark>()
                .HasOne(pt => pt.User)
                .WithMany(t => t.Bookmarks)
                .HasForeignKey(pt => pt.UserId);

            modelBuilder.Entity<Book>()
                .HasOne(c => c.Team)
                .WithMany(c => c.Books)
                .HasForeignKey(c => c.TeamId)
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
            modelBuilder.Entity<Language>().HasData(
                new Language[]
                {
                new Language { Id = "en"},
                new Language { Id = "ru"},
                new Language { Id = "ua"}
                });

            modelBuilder.Entity<TeamMemberRole>().HasData(
                new TeamMemberRole[]
                {
                new TeamMemberRole { Id = "editor"},
                new TeamMemberRole { Id = "translator"},
                new TeamMemberRole { Id = "writer"}
                });
            base.OnModelCreating(modelBuilder);
        }
    }
}
