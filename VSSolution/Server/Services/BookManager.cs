using Microsoft.AspNetCore.Identity;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

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
            return await _db.Books.FindAsync(id);
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
    }
}
