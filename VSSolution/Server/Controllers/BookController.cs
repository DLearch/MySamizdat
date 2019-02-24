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
        private readonly IHostingEnvironment _appEnvironment;

        public BookController(
            UserManager<User> userManager
            , AppDbContext db
            , IHostingEnvironment appEnvironment
        )
        {
            _userManager = userManager;
            _db = db;
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
                    Book book = null;

                    if (!string.IsNullOrEmpty(model.OriginalTitle))
                    {
                        book = new TranslateBook()
                        {
                            OriginalTitle = model.OriginalTitle,
                           // OriginalLanguageId = model.OriginalLanguageId
                        };
                    }
                    else
                        book = new Book();

                    book.UserId = user.Id;
                    book.Title = model.Title;
                    //book.LanguageId = model.LanguageId;

                    await _db.Books.AddAsync(book);
                    
                    await _db.SaveChangesAsync();
                    
                    return Ok(new AddRVM()
                    {
                        BookId = book.Id
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
                    .Include(b => b.User)
                    .Include(b => b.Chapters)
                    .Include(b => b.Comments)
                        .ThenInclude(c => c.Author)
                    .FirstOrDefaultAsync(b => b.Id == model.BookId);
                
                if(book == null)
                    ModelState.AddModelError("Book", "not-found");
                else
                {
                    //book.Genres = book.Genres.Select(g => new Genre()
                    //{
                    //    Id = g.Id,
                    //    TK = g.TK
                    //}).ToList();

                    book.User = new User()
                    {
                        Id = book.UserId,
                        UserName = book.User.UserName,
                        AvatarPath = book.User.AvatarPath
                    };

                    //if (book.Team != null)
                    //    book.Team = new Team()
                    //    {
                    //        Id = book.TeamId,
                    //        Name = book.Team.Name
                    //    };

                    //book.State = new BookState()
                    //{
                    //    Id = book.StateId,
                    //    TK = book.State.TK
                    //};

                    //book.Language = new Language()
                    //{
                    //    Id = book.LanguageId,
                    //    TK = book.Language.TK
                    //};

                    //book.Author = new Author()
                    //{
                    //    Id = book.AuthorId,
                    //    Name = book.Author.Name
                    //};

                    book.Comments = book.Comments.Select(
                        c => new BookComment()
                        {
                            Content = c.Content,
                            CreationTime = c.CreationTime,
                            Id = c.Id,
                            BookId = c.BookId,
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

                    book.Chapters = book.Chapters.Select(c => new Chapter()
                    {
                        Id = c.Id,
                        CreationTime = c.CreationTime,
                        Name = c.Name
                    }).ToList();
                    
                    return Ok(new GetRVM()
                    {
                        Book = book
                    });
                }
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
                    , Books = _db.Books.Skip(model.Page * model.PageSize).Take(model.PageSize).Select(b => new Book()
                    {
                        Id = b.Id,
                        Title = b.Title
                    }).ToList()
                });

            return BadRequest(ModelState);
        }

    }
}
