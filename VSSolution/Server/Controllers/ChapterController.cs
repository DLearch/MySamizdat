using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.ViewModels.ChapterController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Authorize]
    public class ChapterController : BaseController
    {
        public ChapterController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        // ModelErrors:
        // "User" -  ERROR_NOT_FOUND;
        // "BookId" -  ERROR_NOT_FOUND;
        // "Name" -  ERROR_TAKEN;
        [HttpPost]
        public async Task<IActionResult> AddChapter([FromBody]AddChapterVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                Book book = await _db.Books.Include(b => b.Chapters).FirstOrDefaultAsync(b => b.Id == model.BookId);

                AddModelErrorIfNull("BookId", ERROR_NOT_FOUND, book);

                if (ModelState.IsValid)
                {
                    AddModelErrorIfFalse("Name", ERROR_TAKEN, book.Chapters.All(b => b.Name != model.Name));

                    if (ModelState.IsValid)
                    {
                        Chapter chapter = new Chapter()
                        {
                            BookId = model.BookId,
                            Name = model.Name,
                            ChapterStateTK = "work",
                            Index = book.Chapters != null && book.Chapters.Count > 0 ? book.Chapters.Max(c => c.Index) + 1 : 0,
                            LastStateChangeTime = DateTime.Now
                        };

                        await _db.Chapters.AddAsync(chapter);
                        await _db.SaveChangesAsync();

                        return Ok(chapter.Id);
                    }
                }
            }

            return BadRequest(ModelState);
        }
        
        [HttpPost]
        public async Task<IActionResult> GetChapter([FromBody]GetChapterVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                Chapter chapter = await _db.Chapters
                    .Include(c => c.ChapterContents)
                    .Include(c => c.Book)
                        .ThenInclude(b => b.Chapters)
                    .Include(c => c.Comments)
                        .ThenInclude(c => c.User)
                    .FirstOrDefaultAsync(c => c.Id == model.ChapterId);

                AddModelErrorIfNull("ChapterId", ERROR_NOT_FOUND, chapter);

                if (ModelState.IsValid)
                {

                    return Ok(new
                    {
                        chapter.LastStateChangeTime,
                        chapter.Name,
                        chapter.ChapterStateTK,
                        chapter.ChapterContents.LastOrDefault()?.Content,
                        Book = new
                        {
                            chapter.Book.Title,
                            Chapters = chapter.Book.Chapters.OrderBy(c => c.Index).Select(c => new
                            {
                                c.Id,
                                c.Name
                            }).ToList()
                        },
                        Comments = chapter.Comments.Select(c => new
                        {
                            c.Id,
                            c.ParentId,
                            c.Content,
                            c.CreationTime,
                            User = new
                            {
                                c.User.UserName,
                                c.User.AvatarPath
                            }
                        })
                    });
                }
            }

            return BadRequest(ModelState);
        }
    }
}