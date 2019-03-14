using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ConsoleApp
{
    class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Author { get; set; }
        public DbSet<Chapter> Chapters { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
        public DbSet<TranslateBook> TranslateBooks { get; set; }
        public DbSet<BookComment> BookComments { get; set; }
        public DbSet<ChapterComment> ChapterComments { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }
        public DbSet<TeamMemberRole> TeamMemberRoles { get; set; }
        public DbSet<TeamInviteNotification> TeamInviteNotifications { get; set; }
        public DbSet<BookState> BookStates { get; set; }
        public DbSet<BookEvaluation> BookEvaluations { get; set; }
        public DbSet<ChapterContent> ChapterContent { get; set; }
        public DbSet<ChapterState> ChapterStates { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<BookGenre> BookGenres { get; set; }

        public AppDbContext()
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BookComment>()
               .HasOne(c => c.Book)
               .WithMany(c => c.Comments)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Bookmark>()
               .HasOne(c => c.Book)
               .WithMany(c => c.Bookmarks)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ChapterComment>()
               .HasOne(c => c.Chapter)
               .WithMany(c => c.Comments)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TeamInviteNotification>()
               .HasOne(c => c.Team)
               .WithMany(c => c.Invites)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TeamInviteNotification>()
               .HasOne(c => c.User)
               .WithMany(c => c.TeamInvites)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<BookEvaluation>()
               .HasOne(c => c.User)
               .WithMany(c => c.BookEvaluations)
               .OnDelete(DeleteBehavior.Restrict);

            // TranslateBook OriginalLanguage Required
            modelBuilder.Entity<TranslateBook>()
                        .HasOne(e => e.OriginalLanguage)
                        .WithMany(e => e.TranslateBooks)
                        .HasForeignKey(e => e.OriginalLanguageTK)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Language>().HasData(
                new Language[]
                {
                new Language { TK = "en"},
                new Language { TK = "ru"},
                new Language { TK = "ua"}
                });

            modelBuilder.Entity<TeamMemberRole>().HasData(
                new TeamMemberRole[]
                {
                new TeamMemberRole { TK = "head"},
                new TeamMemberRole { TK = "deputy-head"},
                new TeamMemberRole { TK = "member"}
                });

            modelBuilder.Entity<BookState>().HasData(
                new BookState[]
                {
                new BookState { TK = "free"},
                new BookState { TK = "work"},
                new BookState { TK = "pause"},
                new BookState { TK = "complete"}
                }); 
            modelBuilder.Entity<ChapterState>().HasData(
                new ChapterState[]
                {
                    new ChapterState { TK = "work"},
                    new ChapterState { TK = "editing"},
                    new ChapterState { TK = "complete"}
                });
            modelBuilder.Entity<Genre>().HasData(
                new Genre[]
                {
                    new Genre { TK = "historical"},
                    new Genre { TK = "fantasy"},
                    new Genre { TK = "detective"}
                });
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=runootestdb;Trusted_Connection=True;");
        }
    }

    public class User
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string UserName { get; set; }

        public string Email { get; set; }

        public List<Bookmark> Bookmarks { get; set; }
        
        public List<BookComment> BookComments { get; set; }
        public List<ChapterComment> ChapterComments { get; set; }

        public List<Book> Books { get; set; }

        public List<TeamMember> TeamMembers { get; set; }

        public List<TeamInviteNotification> TeamInvites { get; set; }

        public List<BookEvaluation> BookEvaluations { get; set; }
    }

    public class Book
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public string CoverPath { get; set; }
        
        public string AuthorName { get; set; }
        public Author Author { get; set; }

        [Required]
        public string LanguageTK { get; set; }
        public Language Language { get; set; }

        public List<Chapter> Chapters { get; set; }

        public List<Bookmark> Bookmarks { get; set; }

        public List<BookComment> Comments { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        public string TeamName { get; set; }
        public Team Team { get; set; }

        [Required]
        public string BookStateTK { get; set; }
        public BookState BookState { get; set; }
        public string BookStateComment { get; set; }

        public List<BookEvaluation> BookEvaluations { get; set; }
        public List<BookGenre> BookGenre { get; set; }

        public string Discriminator { get; set; }
        
    }

    public class BookState
    {
        [Key]
        [Required]
        public string TK { get; set; }

        public List<Book> Books { get; set; }
    }

    public class Author
    {
        [Key]
        [Required]
        public string Name { get; set; }

        public List<Book> Books { get; set; }
    }

    public class Chapter
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int Index { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int BookId { get; set; }
        public Book Book { get; set; }
        
        public List<ChapterComment> Comments { get; set; }

        [Required]
        public string ChapterStateTK { get; set; }
        public ChapterState ChapterState { get; set; }
        [Required]
        public DateTime LastStateChangeTime { get; set; }

        public List<ChapterContent> ChapterContents { get; set; }
    }

    public class ChapterState
    {
        [Key]
        [Required]
        public string TK { get; set; }

        public List<Chapter> Chapters { get; set; }
    }
    
    public class ChapterContent
    {
        [Key]
        public string Id { get; set; }

        public string Content { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        [Required]
        public int ChapterId { get; set; }
        public Chapter Chapter { get; set; }
    }
    
    public class Language
    {
        [Key]
        [Required]
        public string TK { get; set; }

        [InverseProperty("Language")]
        public List<Book> Books { get; set; }

        [InverseProperty("OriginalLanguage")]
        public List<TranslateBook> TranslateBooks { get; set; }
    }
    
    public class Bookmark
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        [Required]
        public int BookId { get; set; }
        public Book Book { get; set; }
    }

    public class TranslateBook : Book
    {
        [Required]
        public string OriginalTitle { get; set; }
        
        [Required]
        public string OriginalLanguageTK { get; set; }
        public Language OriginalLanguage { get; set; }

    }

    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        public string Discriminator { get; set; }
    }
    public class BookComment : Comment
    {
        [Required]
        public int BookId { get; set; }
        public Book Book { get; set; }
    }
    public class ChapterComment : Comment
    {
        [Required]
        public int ChapterId { get; set; }
        public Chapter Chapter { get; set; }
    }

    public class Team
    {
        [Key]
        public string Name { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }
        
        public string Description { get; set; }

        public List<TeamMember> TeamMembers { get; set; }
        public List<TeamInviteNotification> Invites { get; set; }
        public List<Book> Books { get; set; }
    }

    public class TeamMember
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        [Required]
        public string TeamName { get; set; }
        public Team Team { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        [Required]
        public string TeamMemberRoleTK { get; set; }
        public TeamMemberRole TeamMemberRoles { get; set; }

        public List<TeamInviteNotification> Invites { get; set; }
    }

    public class TeamMemberRole
    {
        [Key]
        [Required]
        public string TK { get; set; }

        public List<TeamMember> TeamMembers { get; set; }
    }

    public class Notification
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        [Required]
        public bool IsChecked { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        public string Discriminator { get; set; }
    }

    public class TeamInviteNotification : Notification
    {
        [Required]
        public string TeamName { get; set; }
        public Team Team { get; set; }

        [Required]
        public int TeamMemberId { get; set; }
        public TeamMember TeamMember { get; set; }
    }

    public class BookEvaluation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int Value { get; set; }

        [Required]
        public int BookId { get; set; }
        public Book Book { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        public string Discriminator { get; set; }
    }

    public class Genre
    {
        [Key]
        [Required]
        public string TK { get; set; }

        public List<Book> Books { get; set; }
    }
    public class BookGenre
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int BookId { get; set; }
        public Book Book { get; set; }

        [Required]
        public string GenreTK { get; set; }
        public Genre Genre { get; set; }
    }
}
