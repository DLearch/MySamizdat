using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Runoo.Models;
using Runoo.ViewModels.ChapterController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Controllers
{
    [Authorize]
    public class ChapterController : BaseController
    {
        public ChapterController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]AddViewModel model)
        {
            if (ModelState.IsValid)
            {
                Book book = await _db.Books
                    .Include(b => b.Chapters)
                    .Include(p => p.Team)
                        .ThenInclude(p => p.TeamMembers)
                    .FirstOrDefaultAsync(b => b.Id == model.BookId);

                if (book == null)
                    return NotFound();
                
                User suppliant = await _userManager.GetUserAsync(User);
                if (suppliant == null 
                    || (book.UserId != suppliant.Id 
                    && (await _db.Teams.Include(p=>p.Books).Include(p => p.TeamMembers)
                        .FirstOrDefaultAsync(p => p.Books.Any(p2 => p2.TeamName.ToUpperInvariant() == p.Name.ToUpperInvariant())))
                        ?.TeamMembers.All(p => p.UserId != suppliant.Id) == true))
                {
                    return Unauthorized();
                }

                if (book.Chapters.Any(p => p.Name.ToUpperInvariant() == model.Name.ToUpperInvariant()))
                    ModelState.AddModelError("Name", ERROR_TAKEN);

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

            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> Get(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Chapter chapter = await _db.Chapters
                .Include(b => b.Book)
                    .ThenInclude(b => b.User)
                .Include(c => c.Book)
                    .ThenInclude(b => b.Chapters)
                .Include(c => c.Comments)
                    .ThenInclude(c => c.User)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (chapter == null)
                return NotFound();


            return Ok(new
            {
                chapter.LastStateChangeTime,
                chapter.Name,
                chapter.ChapterStateTK,
                chapter.Content,
          
                Book = new
                {
                    chapter.Book.Title,
                    Chapters = chapter.Book.Chapters.OrderBy(c => c.Index).Select(c => new
                    {
                        c.Id,
                        c.Name
                    }).ToList(),
                    User = new
                    {
                        chapter.Book.User.UserName,
                        chapter.Book.User.AvatarPath
                    }
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

        [HttpPost]
        public async Task<IActionResult> Update(int id, [FromBody]UpdateViewModel model)
        {
            // Check if model is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Get chapter and check if it exists
            Chapter chapterToUpdate = await _db.Chapters
                .Include(p => p.Book)
                    .ThenInclude(p => p.Chapters)
                .Include(p => p.Book)
                    .ThenInclude(p => p.Team)
                        .ThenInclude(p => p.TeamMembers)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (chapterToUpdate == null)
            {
                return NotFound();
            }
            
            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null 
                || suppliant.Id != chapterToUpdate.Book.UserId 
                || chapterToUpdate.Book.Team.TeamMembers.All(p => p.UserId != suppliant.Id))
            {
                return Unauthorized();
            }

            //Check if name is unique
            if (chapterToUpdate.Name != model.Name && chapterToUpdate.Book.Chapters.Any(p => p.Name.ToUpperInvariant() == model.Name.ToUpperInvariant()))
            {
                ModelState.AddModelError("Name", ERROR_TAKEN);
            }

            // Check if model is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Update fields
            chapterToUpdate.Name = model.Name;
            chapterToUpdate.Content = model.Content;

            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}
