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
                    Book book = _db.Books.Find(model.BookId);
                    if (user.Id == book.UserId)
                    {
                        Chapter chapter = new Chapter()
                        {
                            BookId = book.Id,
                            CreationTime = DateTime.Now,
                            Name = model.Name,
                            Content = model.Content
                        };

                        await _db.Chapters.AddAsync(chapter);

                        await _db.SaveChangesAsync();

                        return Ok(new AddRVM()
                        {
                            ChapterId = chapter.Id
                        });
                    }
                    else
                        ModelState.AddModelError("User", "access");
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
                    .Include(c => c.Comments)
                     .ThenInclude(c => c.Author)
                    .FirstOrDefaultAsync(c => c.Id == model.ChapterId);

                if (chapter == null)
                    ModelState.AddModelError("Chapter", "not-found");
                else
                {
                    chapter.Book = new Book()
                    {
                        Id = chapter.BookId,
                        Title = chapter.Book.Title
                    };

                    chapter.Comments = chapter.Comments.Select(
                        c => new ChapterComment()
                        {
                            Content = c.Content,
                            CreationTime = c.CreationTime,
                            Id = c.Id,
                            ChapterId = c.ChapterId,
                            AuthorId = c.AuthorId,
                            Author = new User()
                            {
                                Id = c.AuthorId,
                                UserName = c.Author.UserName,
                                AvatarPath = c.Author.AvatarPath
                            },
                            ParentId = c.ParentId
                        }
                        ).ToList();

                    return Ok(new GetRVM()
                    {
                        Chapter = chapter
                    });
                }
            }

            return BadRequest(ModelState);
        }
    }
}
