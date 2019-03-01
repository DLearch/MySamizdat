using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.ViewModels.Bookmark;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Models.Books;

namespace Server.Controllers
{
    public class BookmarkController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _db;

        public BookmarkController(
            UserManager<User> userManager
            , AppDbContext db
        )
        {
            _userManager = userManager;
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]AddVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    Book book = await _db.Books.Include(b => b.Bookmarks).FirstOrDefaultAsync(b => b.Id == model.BookId);

                    if (book == null)
                        ModelState.AddModelError("Book", "not-found");
                    else
                    {
                        book.Bookmarks.Add(new Bookmark()
                        {
                            BookId = model.BookId,
                            UserId = user.Id
                        });

                        await _db.SaveChangesAsync();

                        return Ok();
                    }
                }
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> Get()
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    List<object> books = new List<object>();

                    foreach (var book in _db.Books.Where(b => b.Bookmarks.Any(bm => bm.UserId == user.Id)).ToList())
                        books.Add(new
                        {
                            book.Id,
                            book.Title,
                            book.CoverPath
                        });

                    return Ok(books);
                }
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> Remove([FromBody]RemoveVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    Book book = await _db.Books.Include(b => b.Bookmarks).FirstOrDefaultAsync(b => b.Id == model.BookId);

                    if (book == null)
                        ModelState.AddModelError("Book", "not-found");
                    else
                    {
                        Bookmark bookmark = book.Bookmarks.FirstOrDefault(bm => bm.UserId == user.Id);

                        if (bookmark == null)
                            ModelState.AddModelError("Bookmark", "not-found");
                        else
                        {
                            user.Bookmarks.Remove(bookmark);

                            await _db.SaveChangesAsync();

                            return Ok();
                        }
                    }
                }
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }
    }
}
