using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.ViewModels.Bookmark;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IActionResult> Add(AddVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    await _db.Bookmarks.AddAsync(new Bookmark()
                    {
                        BookId = model.BookId,
                        UserId = user.Id
                    });
                    
                    await _db.SaveChangesAsync();

                    return Ok();
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

                    List<object> bookmarks = new List<object>();

                    foreach (var bookmark in _db.Bookmarks
                        .Where(b => b.UserId == user.Id)
                        .Include(b => b.Book)
                        .ToList())
                        bookmarks.Add(new
                        {
                            bookId = bookmark.BookId,
                            bookTitle = bookmark.Book.Title
                        });

                    return Ok(bookmarks);
                }
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> Remove(RemoveVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    Bookmark bookmark = _db.Bookmarks.FirstOrDefault(b => b.UserId == user.Id && b.BookId == b.BookId);

                    if (bookmark == null)
                        ModelState.AddModelError("Bookmark", "not-found");
                    else
                    {
                        _db.Bookmarks.Remove(bookmark);

                        await _db.SaveChangesAsync();

                        return Ok();
                    }
                }
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }
    }
}
