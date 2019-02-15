using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
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
        public async Task<IActionResult> CommentBook([FromBody]CommentBookVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    BookComment comment = new BookComment()
                    {
                        AuthorId = user.Id
                        , BookId = model.BookId
                        , Content = model.Content
                        , CreationTime = DateTime.Now
                    };

                    await _db.BookComments.AddAsync(comment);

                    await _db.SaveChangesAsync();

                    return Ok(new CommentBookRVM()
                    {
                        CommentId = comment.Id,
                        CreationTime = comment.CreationTime,
                        Author = new User()
                        {
                            Id = user.Id,
                            UserName = user.UserName
                        }
                    });
                }
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> CommentChapter([FromBody]CommentChapterVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    ChapterComment comment = new ChapterComment()
                    {
                        AuthorId = user.Id
                        , ChapterId = model.ChapterId
                        , Content = model.Content
                        , CreationTime = DateTime.Now
                    };

                    await _db.ChapterComments.AddAsync(comment);

                    await _db.SaveChangesAsync();

                    return Ok(new CommentBookRVM()
                    {
                        CommentId = comment.Id,
                        CreationTime = comment.CreationTime,
                        Author = new User()
                        {
                            Id = user.Id,
                            UserName = user.UserName
                        }
                    });
                }
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }
    }
}
