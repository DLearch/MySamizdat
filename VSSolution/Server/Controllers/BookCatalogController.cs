using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.ViewModels.BookCatalogController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    public class BookCatalogController : BaseController
    {
        public BookCatalogController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        // ModelErrors:
        [HttpPost]
        public async Task<IActionResult> GetPage([FromBody]GetPageVM model)
        {
            User user = null;

            if (model.Filters != null && model.Filters.Any(f => f.Type == "bookmark"))
                user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                List<Book> books = _db.Books
                        .Include(b => b.Bookmarks)
                        .Include(b => b.User)
                        .ToList()
                        .Where(b => FilterBookAsync(model.Filters, b, user))
                        .ToList();

                int bookCount = books.Count();
                int page = model.Page;

                if (bookCount - (model.Page * model.PageSize) < 1)
                {
                    page = bookCount / model.PageSize;

                    if (page > 0 && bookCount % model.PageSize == 0)
                        page--;
                }

                return Ok(new
                {
                    Length = bookCount,
                    Page = page,
                    Books = books
                        .Skip(page * model.PageSize)
                        .Take(model.PageSize)
                        .Select(b => new
                        {
                            b.Id,
                            b.Title,
                            b.CoverPath
                        }).ToList()
                });
            }

            return BadRequest(ModelState);
        }

        [NonAction]
        bool FilterBookAsync(List<CatalogFilter> filters, Book book, User user = null)
        {
            if (filters != null && book != null)
                foreach (CatalogFilter filter in filters)
                {
                    switch(filter.Type)
                    {
                        case "translate":

                            if (book.Discriminator == "TranslateBook")
                                return false;

                            break;

                        case "bookmark":
                            
                            if (user == null || string.IsNullOrEmpty(user.Id) || book.Bookmarks == null || book.Bookmarks.All(b => b.UserId != user.Id))
                                return false;

                            break;

                        case "search":

                            string value = filter.Value as string;

                            if (!string.IsNullOrEmpty(book.Title) && book.Title.Contains(value)
                                || !string.IsNullOrEmpty(book.AuthorName) && book.AuthorName.Contains(value)
                                || !string.IsNullOrEmpty(book.TeamName) && book.TeamName.Contains(value)
                                || book.User != null && !string.IsNullOrEmpty(book.User.UserName) && book.User.UserName.Contains(value)
                                || !string.IsNullOrEmpty(book.Discriminator) && book.Discriminator == "TranslateBook" 
                                && !string.IsNullOrEmpty((book as TranslateBook).OriginalTitle) && (book as TranslateBook).OriginalTitle.Contains(value))
                                break;
                            else
                                return false;
                    }
                }
            return true;
        }

    }
}
