using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.ViewModels.CommentController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Authorize]
    public class CommentController : BaseController
    {
        public CommentController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        // ModelErrors:
        // "User" -  ERROR_NOT_FOUND;
        // "BookId" -  ERROR_NOT_FOUND;
        // "ChapterId" -  ERROR_NOT_FOUND;
        // "EntityType" -  ERROR_NOT_FOUND;
        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody]AddCommentVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                switch (model.EntityType)
                {
                    case "book":
                        AddModelErrorIfNull("BookId", ERROR_NOT_FOUND, await _db.Books.FindAsync(model.EntityId));
                        break;

                    case "chapter":
                        AddModelErrorIfNull("ChapterId", ERROR_NOT_FOUND, await _db.Chapters.FindAsync(model.EntityId));
                        break;

                    default:
                        ModelState.AddModelError("EntityType", ERROR_NOT_FOUND);
                        break;
                }

                if (ModelState.IsValid)
                {
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
                    comment.UserId = user.Id;

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

            return BadRequest(ModelState);
        }
    }
}
