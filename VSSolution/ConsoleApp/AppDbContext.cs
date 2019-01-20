using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleApp
{
    class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Series> Series { get; set; }
        public DbSet<Chain> Chains { get; set; }
        public DbSet<Book> Books { get; set; }

        public AppDbContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserTeam>()
                .HasKey(t => new { t.UserId, t.TeamId });

            modelBuilder.Entity<UserTeam>()
                .HasOne(sc => sc.User)
                .WithMany(s => s.Teams)
                .HasForeignKey(sc => sc.UserId);

            modelBuilder.Entity<UserTeam>()
                .HasOne(sc => sc.Team)
                .WithMany(c => c.Members)
                .HasForeignKey(sc => sc.TeamId);
            ///////////////////////////////////////////////////////////////////////////////////////
            modelBuilder.Entity<UserTeam>()
                .HasKey(t => new { t.UserId, t.TeamId });

            modelBuilder.Entity<UserTeam>()
                .HasOne(sc => sc.User)
                .WithMany(s => s.Teams)
                .HasForeignKey(sc => sc.UserId);

            modelBuilder.Entity<UserTeam>()
                .HasOne(sc => sc.Team)
                .WithMany(c => c.Members)
                .HasForeignKey(sc => sc.TeamId);

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=runootestdb;Trusted_Connection=True;");
        }
    }
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public List<UserTeam> Teams { get; set; }
        public List<UserBook> BooksSubscribes { get; set; }
        public List<UserChain> ChainsSubscribes { get; set; }
        public List<UserSeries> SeriesSubscribes { get; set; }
        public List<UserTeam> TeamsSubscribes { get; set; }
    }
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<UserTeam> Members { get; set; }
        public List<TeamBook> Books { get; set; }
        public List<TeamSeries> Series { get; set; }
        public List<UserTeam> Subscribers { get; set; }

    }
    public class Series
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<UserSeries> Subscribers { get; set; }
        public List<TeamSeries> Team { get; set; }
        public List<SeriesChain> Chains { get; set; }
    }
    public class Chain
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ChainBook> Books { get; set; }
        public List<UserChain> Subscribers { get; set; }
        public List<SeriesChain> Series { get; set; }
    }
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<UserBook> Subscribers { get; set; }
        public List<TeamBook> Team { get; set; }
        public List<ChainBook> Chains { get; set; }
    }

    public class UserTeam
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int TeamId { get; set; }
        public Team Team { get; set; }
    }
    public class UserBook
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; }
    }
    public class UserChain
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int ChainId { get; set; }
        public Chain Chain { get; set; }
    }
    public class UserSeries
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int SeriesId { get; set; }
        public Series Series { get; set; }
    }
    public class TeamSeries
    {
        public int TeamId { get; set; }
        public Team Team { get; set; }

        public int SeriesId { get; set; }
        public Series Series { get; set; }
    }
    public class TeamBook
    {
        public int TeamId { get; set; }
        public Team Team { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; }
    }
    public class SeriesChain
    {
        public int SeriesId { get; set; }
        public Series Series { get; set; }

        public int ChainId { get; set; }
        public Chain Chain { get; set; }
    }
    public class ChainBook
    {
        public int ChainId { get; set; }
        public Chain Chain { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; }
    }
}
