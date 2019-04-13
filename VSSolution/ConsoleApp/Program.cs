using System;
using System.Linq;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Qwert".ToUpper());
            Console.WriteLine("Qwert".ToUpperInvariant());
            Console.WriteLine("Qwert".Normalize(System.Text.NormalizationForm.FormD));
            Console.WriteLine("Qwert".Normalize(System.Text.NormalizationForm.FormKC));
            Console.WriteLine("Qwert".Normalize(System.Text.NormalizationForm.FormKD));
            //using (AppDbContext db = new AppDbContext())
            //{
            //    ///////////////////////////////////////////////////////////////////////////////////

            //    // создаем два объекта User
            //    User user1 = new User { UserName = "User1" };
            //    User user2 = new User { UserName = "User2" };

            //    // добавляем их в бд
            //    db.Users.Add(user1);
            //    db.Users.Add(user2);
            //    db.SaveChanges();
            //    Console.WriteLine("User успешно сохранены");

            //    // получаем объекты из бд и выводим на консоль
            //    var users = db.Users.ToList();
            //    Console.WriteLine("Список объектов:");
            //    foreach (User u in users)
            //    {
            //        Console.WriteLine($"{u.Id}.{u.UserName}");
            //    }

            //    ///////////////////////////////////////////////////////////////////////////////////
                
            //    Author author1 = new Author { Name = "Author1" };
            //    Author author2 = new Author { Name = "Author2" };

            //    db.Author.Add(author1);
            //    db.Author.Add(author2);
            //    db.SaveChanges();
            //    Console.WriteLine("Author успешно сохранены");


            //    // получаем объекты из бд и выводим на консоль
            //    var authors = db.Author.ToList();
            //    Console.WriteLine("Список объектов:");
            //    foreach (Author b in authors)
            //    {
            //        Console.WriteLine($"{b.Name}");
            //    }

            //    ///////////////////////////////////////////////////////////////////////////////////

            //    Team team1 = new Team() { Name = "Team1Name", CreationTime = DateTime.Now };

            //    db.Teams.Add(team1);
            //    db.SaveChanges();
            //    Console.WriteLine("Teams успешно сохранены");

            //    var teams = db.Teams.ToList();
            //    Console.WriteLine("Список объектов:");
            //    foreach (Team b in teams)
            //    {
            //        Console.WriteLine($"{b.Name}.{b.CreationTime}");
            //    }
            //    ///////////////////////////////////////////////////////////////////////////////////

            //    Book book1 = new Book { Title = "Book1", LanguageTK = "ru", User = user1, TeamName = "Team1Name", BookStateTK = "work" };
            //    Book book2 = new Book { Title = "Book2", LanguageTK = "en", AuthorName = "Author1", User = user2, BookStateTK = "work" };

            //    db.Books.Add(book1);
            //    db.Books.Add(book2);
            //    db.SaveChanges();
            //    Console.WriteLine("Book успешно сохранены");


            //    // получаем объекты из бд и выводим на консоль
            //    var books = db.Books.ToList();
            //    Console.WriteLine("Список объектов:");
            //    foreach (Book b in books)
            //    {
            //        Console.WriteLine($"{b.Id}.{b.Title}.{b.AuthorName}.{b.LanguageTK}.{b.User.UserName}.{b.TeamName}");
            //    }

            //    ///////////////////////////////////////////////////////////////////////////////////
                
            //    Bookmark bookmark1 = new Bookmark { BookId = book1.Id, UserId = user1.Id };
            //    Bookmark bookmark2 = new Bookmark { BookId = book2.Id, UserId = user2.Id };

            //    db.Bookmarks.Add(bookmark1);
            //    db.Bookmarks.Add(bookmark2);
            //    db.SaveChanges();
            //    Console.WriteLine("Bookmark успешно сохранены");


            //    // получаем объекты из бд и выводим на консоль
            //    var bookmarks = db.Bookmarks.ToList();
            //    Console.WriteLine("Список объектов:");
            //    foreach (Bookmark b in bookmarks)
            //    {
            //        Console.WriteLine($"{b.Id}.{b.User.UserName}.{b.BookId}");
            //    }

            //    ///////////////////////////////////////////////////////////////////////////////////

            //    TranslateBook tbook1 = new TranslateBook { Title = "TBook1", LanguageTK = "ru", OriginalLanguageTK = "en", BookStateTK = "work", OriginalTitle = "ORGTBook1", User = user1 };
            //    TranslateBook tbook2 = new TranslateBook { Title = "TBook2", LanguageTK = "en", OriginalLanguageTK = "ua", BookStateTK = "work", AuthorName = "Author2", OriginalTitle = "ORGTBook2", User = user1 };

            //    db.TranslateBooks.Add(tbook1);
            //    db.Books.Add(tbook2);
            //    db.SaveChanges();
            //    Console.WriteLine("TranslateBooks успешно сохранены");


            //    // получаем объекты из бд и выводим на консоль
            //    var tbooks = db.TranslateBooks.ToList();
            //    Console.WriteLine("Список объектов:");
            //    foreach (TranslateBook b in tbooks)
            //    {
            //        Console.WriteLine($"{b.Id}.{b.Title}.{b.AuthorName}.{b.LanguageTK}.{b.OriginalLanguageTK}.{b.OriginalTitle}");
            //    }

            //    ///////////////////////////////////////////////////////////////////////////////////

            //    BookComment bookComment1 = new BookComment() { UserId = user1.Id, BookId = book1.Id, CreationTime = DateTime.Now, Content = "content1" };
            //    BookComment bookComment2 = new BookComment() { UserId = user2.Id, BookId = book2.Id, CreationTime = DateTime.Now, Content = "content2" };

            //    db.BookComments.Add(bookComment1);
            //    db.BookComments.Add(bookComment2);
            //    db.SaveChanges();
            //    Console.WriteLine("BookComments успешно сохранены");

            //    // получаем объекты из бд и выводим на консоль
            //    var bookComments = db.BookComments.ToList();
            //    Console.WriteLine("Список объектов:");
            //    foreach (BookComment b in bookComments)
            //    {
            //        Console.WriteLine($"{b.Id}.{b.User.UserName}.{b.BookId}.{b.Discriminator}.{b.CreationTime}.{b.Content}");
            //    }

            //    ///////////////////////////////////////////////////////////////////////////////////

            //    Chapter chapter1 = new Chapter() { BookId = book1.Id, Index = 1, ChapterStateTK = "work", Name = "CH1" };
            //    Chapter chapter2 = new Chapter() { BookId = book1.Id, Index = 0, ChapterStateTK = "work", Name = "CH2" };

            //    db.Chapters.Add(chapter1);
            //    db.Chapters.Add(chapter2);
            //    db.SaveChanges();
            //    Console.WriteLine("Chapters успешно сохранены");

            //    // получаем объекты из бд и выводим на консоль
            //    var chapters = db.Chapters.ToList();
            //    Console.WriteLine("Список объектов:");
            //    foreach (Chapter b in chapters)
            //    {
            //        Console.WriteLine($"{b.Id}.{b.BookId}");
            //    }

            //    ///////////////////////////////////////////////////////////////////////////////////

            //    ChapterComment chapterComment1 = new ChapterComment() { UserId = user1.Id, ChapterId = chapter1.Id, CreationTime = DateTime.Now, Content = "content1" };
            //    ChapterComment chapterComment2 = new ChapterComment() { UserId = user2.Id, ChapterId = chapter2.Id, CreationTime = DateTime.Now, Content = "content2" };

            //    db.ChapterComments.Add(chapterComment1);
            //    db.ChapterComments.Add(chapterComment2);
            //    db.SaveChanges();
            //    Console.WriteLine("ChapterComments успешно сохранены");

            //    // получаем объекты из бд и выводим на консоль
            //    var chapterComments = db.ChapterComments.ToList();
            //    Console.WriteLine("Список объектов:");
            //    foreach (ChapterComment b in chapterComments)
            //    {
            //        Console.WriteLine($"{b.Id}.{b.User.UserName}.{b.ChapterId}.{b.Discriminator}.{b.CreationTime}.{b.Content}");
            //    }

            //    ///////////////////////////////////////////////////////////////////////////////////

            //    TeamMember teamMember1 = new TeamMember() { TeamName = team1.Name, UserId = user1.Id, CreationTime = DateTime.Now, TeamMemberRoleTK = "head" };

            //    db.TeamMembers.Add(teamMember1);
            //    db.SaveChanges();
            //    Console.WriteLine("TeamMembers успешно сохранены");

            //    var teamMembers = db.TeamMembers.ToList();
            //    Console.WriteLine("Список объектов:");
            //    foreach (TeamMember b in teamMembers)
            //    {
            //        Console.WriteLine($"{b.Id}.{b.TeamName}.{b.User.UserName}.{b.TeamMemberRoleTK}");
            //    }

            //    ///////////////////////////////////////////////////////////////////////////////////

            //    BookEvaluation bookEvaluation1 = new BookEvaluation() { BookId = book1.Id, UserId = user1.Id, Value = 0 };

            //    db.BookEvaluations.Add(bookEvaluation1);
            //    db.SaveChanges();
            //    Console.WriteLine("BookEvaluations успешно сохранены");

            //    var bookEvaluations = db.BookEvaluations.ToList();
            //    Console.WriteLine("Список объектов:");
            //    foreach (BookEvaluation b in bookEvaluations)
            //    {
            //        Console.WriteLine($"{b.Id}.{b.Value}.{b.User.UserName}.{b.Book.Title}");
            //    }
            //}
        }
    }
}
