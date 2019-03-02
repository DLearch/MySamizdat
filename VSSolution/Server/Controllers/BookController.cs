using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Server.Models;
using Server.Models.Books;
using Server.Models.Comments;
using Server.Models.States;
using Server.Services;
using Server.ViewModels.Book;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Authorize]
    public class BookController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _db;

        public BookController(
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

                if(user != null)
                {
                    if (await _db.Books.AnyAsync(b => b.Title == model.Title))
                        ModelState.AddModelError("Title", "already-taken");
                    else
                    {
                        if (await _db.Languages.AllAsync(l => l.Id != model.LanguageTK))
                            ModelState.AddModelError("Language", "not-found");
                        else
                        {
                            Book book = new Book()
                            {
                                Title = model.Title,
                                UserId = user.Id,
                                LanguageId = model.LanguageTK
                            };

                            await _db.Books.AddAsync(book);

                            await _db.SaveChangesAsync();

                            return Ok(book.Id);
                        }
                    }

                }
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> AddTranslate([FromBody]AddTranslateVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user == null)
                    ModelState.AddModelError("User", "not-found");
                else
                {
                    if (await _db.Books.AnyAsync(b => b.Title == model.Title))
                        ModelState.AddModelError("Title", "already-taken");
                    else
                    {
                        if (await _db.Languages.AllAsync(l => l.Id != model.LanguageTK))
                            ModelState.AddModelError("Language", "not-found");
                        else
                        {
                            TranslateBook book = new TranslateBook()
                            {
                                OriginalTitle = model.OriginalTitle,
                                Title = model.Title,
                                UserId = user.Id,
                                LanguageId = model.LanguageTK
                            };

                            await _db.TranslateBooks.AddAsync(book);

                            await _db.SaveChangesAsync();

                            return Ok(book.Id);
                        }
                    }
                }
            }

            return BadRequest(ModelState);
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Get([FromBody]GetVM model)
        {
            if (ModelState.IsValid)
            {
                Book book = await _db.Books
                    .Include(b => b.User)
                    .Include(b => b.Chapters)
                    .Include(b => b.Bookmarks)
                    .Include(b => b.Comments)
                        .ThenInclude(c => c.Author)
                    .FirstOrDefaultAsync(b => b.Id == model.BookId);
                
                if(book == null)
                    ModelState.AddModelError("Book", "not-found");
                else
                {
                    User user = await _userManager.GetUserAsync(User);
                    
                    return Ok(new
                    {
                        book.Title,
                        book.Description,
                        book.CoverPath,
                        OriginalTitle = book.GetType() == typeof(TranslateBook) ? (book as TranslateBook).OriginalTitle : null,
                        LanguageTK = book.LanguageId,
                        Bookmark = user != null && book.Bookmarks.Any(b => b.UserId == user.Id),
                        User = new
                        {
                            book.User.UserName,
                            book.User.AvatarPath
                        },
                        Comments = book.Comments.Select(comment => new
                        {
                            comment.Id,
                            comment.Content,
                            comment.CreationTime,
                            comment.ParentId,
                            Author = new
                            {
                                comment.Author.UserName,
                                comment.Author.AvatarPath
                            }
                        }).ToList(),
                        Chapters = book.Chapters.OrderBy(c => c.Index).Select(chapter => new
                        {
                            chapter.Id,
                            chapter.CreationTime,
                            chapter.Name
                        }).ToList()
                    });
                }
            }

            return BadRequest(ModelState);
        }
    }
}
