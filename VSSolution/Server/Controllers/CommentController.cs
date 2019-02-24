using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Models.Comments;
using Server.ViewModels.Comment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    public class CommentController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _db;

        public CommentController(
            UserManager<User> userManager
            , AppDbContext db
        )
        {
            _userManager = userManager;
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]CreateVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    Comment comment = null;
                    switch(model.EntityType)
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
                        default:
                            ModelState.AddModelError("EntityType", "not-found");
                            break;
                    }

                    if (comment != null)
                    {
                        comment.Content = model.Content;
                        comment.CreationTime = DateTime.Now;
                        comment.AuthorId = user.Id;
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
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }
    }
}
