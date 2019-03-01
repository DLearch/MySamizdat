using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Server.Models;
using Server.Models.Books;
using Server.Models.Comments;
using Server.ViewModels.Chapter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Authorize]
    public class ChapterController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _db;

        public ChapterController(
            UserManager<User> userManager
            , IConfiguration configuration
            , AppDbContext db
        )
        {
            _userManager = userManager;
            _configuration = configuration;
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
                    Book book = await _db.Books.Include(b => b.Chapters).FirstOrDefaultAsync(b => b.Id == model.BookId);

                    if (book == null)
                        ModelState.AddModelError("Book", "not-found");
                    else
                    {
                        if (user.Id != book.UserId)
                            ModelState.AddModelError("User", "access");
                        else
                        {
                            if (book.Chapters.Count > 0)
                            {
                                int maxIndex = book.Chapters.Max(c => c.Index);
                                if (model.Index.HasValue && model.Index.Value >= 0 && model.Index.Value <= maxIndex)
                                    foreach (var c in book.Chapters.Where(c => c.Index >= model.Index.Value))
                                        c.Index++;
                                else
                                    model.Index = maxIndex + 1;
                            }
                            else
                                model.Index = 0;



                            Chapter chapter = new Chapter()
                            {
                                BookId = book.Id,
                                CreationTime = DateTime.Now,
                                Name = model.Name,
                                Content = model.Content,
                                Index = model.Index.Value
                            };

                            await _db.Chapters.AddAsync(chapter);

                            await _db.SaveChangesAsync();

                            return Ok(chapter.Id);
                        }
                    }
                }
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Get([FromBody]GetVM model)
        {
            if (ModelState.IsValid)
            {
                Chapter chapter = await _db.Chapters
                    .Include(c => c.Book)
                     .ThenInclude(c => c.Chapters)
                    .Include(c => c.Comments)
                     .ThenInclude(c => c.Author)
                    .FirstOrDefaultAsync(c => c.Id == model.ChapterId);

                if (chapter == null)
                    ModelState.AddModelError("Chapter", "not-found");
                else
                {
                    return Ok(new
                    {
                        chapter.Content,
                        chapter.CreationTime,
                        chapter.Name,
                        Book = new {
                            chapter.Book.Id,
                            chapter.Book.Title,
                            Chapters = chapter.Book.Chapters.OrderBy(c => c.Index).Select(c => new
                            {
                                c.Id,
                                c.Name
                            }).ToList()
                        },
                        Comments = chapter.Comments.Select(comment => new
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
                    });
                }
            }

            return BadRequest(ModelState);
        }
    }
}
