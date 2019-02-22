using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Server.Models;
using Server.Models.Comments;
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
        private readonly ImageStorage _imageStorage;
        private readonly IHostingEnvironment _appEnvironment;

        public BookController(
            UserManager<User> userManager
            , AppDbContext db
            , ImageStorage imageStorage
            , IHostingEnvironment appEnvironment
        )
        {
            _userManager = userManager;
            _db = db;
            _imageStorage = imageStorage;
            _appEnvironment = appEnvironment;
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Add(AddVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if(user != null)
                {
                    Book book = new Book()
                    {
                        Title = model.Title,
                        OwnerId = user.Id
                    };

                    await _db.Books.AddAsync(book);
                    
                    await _db.SaveChangesAsync();
                    
                    return Ok(new AddRVM()
                    {
                        Id = book.Id
                    });
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
                Book book = await _db.Books
                    .Include(b => b.Owner)
                    .Include(b => b.Chapters)
                    .Include(b => b.Comments)
                        .ThenInclude(c => c.Author)
                    .AsNoTracking()
                    .FirstOrDefaultAsync(b => b.Id == model.Id);
                
                if(book != null)
                {
                    if (book.Owner != null)
                        book.Owner = new User()
                        {
                            Id = book.Owner.Id,
                            UserName = book.Owner.UserName
                        };

                    if(book.Comments != null)
                    {
                        book.Comments = book.Comments.Select(c => {

                            BookComment comment = new BookComment()
                            {
                                Id = c.Id
                                , AuthorId = c.AuthorId
                                , CreationTime = c.CreationTime
                                , Content = c.Content
                            };

                            if (c.Author != null)
                                comment.Author = new User()
                                {
                                    Id = c.AuthorId
                                    , UserName = c.Author.UserName
                                };

                            return comment;
                        }).ToList();
                    }

                    if (book.Chapters != null)
                    {
                        book.Chapters = book.Chapters.Select(c => {

                            return new Chapter()
                            {
                                BookId = c.BookId,
                                CreationTime = c.CreationTime,
                                Id = c.Id,
                                Name = c.Name
                            };
                        }).ToList();
                    }
                }

                return Ok(new GetRVM()
                {
                    Book = book
                });
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult GetCatalog([FromBody]GetCatalogVM model)
        {
            if (ModelState.IsValid)
                return Ok(new GetCatalogRVM()
                {
                    Length = _db.Books.Count()
                    , Books = _db.Books.Skip(model.Page * model.PageSize).Take(model.PageSize).ToList()
                });

            return BadRequest(ModelState);
        }

    }
}
