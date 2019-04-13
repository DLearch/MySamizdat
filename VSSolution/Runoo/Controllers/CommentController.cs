using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Runoo.Models;
using Runoo.ViewModels.CommentController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Controllers
{
    [Authorize]
    public class CommentController : BaseController
    {
        public CommentController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]AddViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null)
            {
                return Unauthorized();
            }

            switch (model.EntityType)
            {
                case "book":

                    if (await _db.Books.FindAsync(model.EntityId) == null)
                        return NotFound();
                    break;

                case "chapter":

                    if (await _db.Chapters.FindAsync(model.EntityId) == null)
                        return NotFound();
                    break;

                default:
                    ModelState.AddModelError("EntityType", ERROR_NOT_FOUND);
                    break;
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Comment comment = null;
            switch (model.EntityType)
            {
                case "book":
                    comment = new BookComment()
                    {
                        BookId = model.EntityId
                    };
                    break;

                case "chapter":
                    comment = new ChapterComment()
                    {
                        ChapterId = model.EntityId
                    };
                    break;
            }

            comment.Content = model.Content;
            comment.CreationTime = DateTime.Now;
            comment.UserId = suppliant.Id;

            if (model.ParentId > 0)
                comment.ParentId = model.ParentId;

            await _db.Comments.AddAsync(comment);
            await _db.SaveChangesAsync();

            return Ok(new
            {
                comment.Id,
                comment.CreationTime
            });
        }
    }
}
