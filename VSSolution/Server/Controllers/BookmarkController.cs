using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.ViewModels.BookmarkController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Authorize]
    public class BookmarkController : BaseController
    {
        public BookmarkController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        [HttpPost]
        public async Task<IActionResult> AddBookmark([FromBody]AddBookmarkVM model)
        {
            User user = await GetUserAsync();
                
            if (ModelState.IsValid)
            {
                Book book = await _db.Books.Include(b => b.Bookmarks).FirstOrDefaultAsync(b => b.Id == model.BookId);

                AddModelErrorIfNull("Book", ERROR_NOT_FOUND, book);

                if (ModelState.IsValid)
                {
                    AddModelErrorIfFalse("Bookmark", ERROR_ALREADY, book.Bookmarks.All(bm => bm.UserId != user.Id));

                    if (ModelState.IsValid)
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
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> RemoveBookmark([FromBody]RemoveBookmarkVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                Book book = await _db.Books.Include(b => b.Bookmarks).FirstOrDefaultAsync(b => b.Id == model.BookId);

                AddModelErrorIfNull("Book", ERROR_NOT_FOUND, book);

                if (ModelState.IsValid)
                {
                    Bookmark bookmark = book.Bookmarks.FirstOrDefault(bm => bm.UserId == user.Id);

                    AddModelErrorIfNull("Bookmark", ERROR_NOT_FOUND, bookmark);

                    if (ModelState.IsValid)
                    {
                        book.Bookmarks.Remove(bookmark);

                        await _db.SaveChangesAsync();

                        return Ok();
                    }
                }
            }

            return BadRequest(ModelState);
        }
    }
}
