using Microsoft.AspNetCore.Identity;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Server.Services
{
    public class BookManager
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _db;

        public BookManager(
            UserManager<User> userManager
            , AppDbContext db
        )
        {
            _userManager = userManager;
            _db = db;
        }

        public async Task<int> CreateBookAsync(string title, string ownerId)
        {
            return await CreateBookAsync(new Book()
            {
                Title = title
                , OwnerId = ownerId
            });
        }

        public async Task<int> CreateBookAsync(Book book)
        {
            await _db.Books.AddAsync(book);

            await _db.SaveChangesAsync();

            return book.Id;
        }

        public async Task<Book> GetBookByIdAsync(int id)
        {
            Book book = await _db.Books
                .Include(b => b.Owner)
                .Include(b => b.Comments)
                .AsNoTracking().FirstOrDefaultAsync(b => b.Id == id);

            book.Owner = book.Owner.GetPublicCopy();

            return book;
        }

        public async Task DeleteBookByIdAsync(int id)
        {
            _db.Books.Remove(new Book() { Id = id });
            
            await _db.SaveChangesAsync();
        }

        public int GetBooksCount()
        {
            return _db.Books.Count();
        }

        public async Task<int> CreateCommentAsync(string content, string authorId, int bookId, int parentId = 0)
        {
            return await CreateCommentAsync(new Comment()
            {
                Content = content
                , AuthorId = authorId
                , BookId = bookId
                , ParentId = parentId
            });
        }

        public async Task<int> CreateCommentAsync(Comment comment)
        {
            comment.Date = DateTime.Now;

            await _db.Comments.AddAsync(comment);

            await _db.SaveChangesAsync();

            return comment.Id;
        }
    }
}
