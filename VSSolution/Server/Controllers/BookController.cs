using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.ViewModels.BookController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Authorize]
    public class BookController : BaseController
    {
        public BookController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        // ModelErrors:
        // "User" -  ERROR_NOT_FOUND;
        // "Title" -  ERROR_TAKEN;
        // "LanguageTK" -  ERROR_NOT_FOUND;
        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody]AddBookVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                AddModelErrorIfFalse("Title", ERROR_TAKEN, _db.Books.All(b => b.Title != model.Title));

                AddModelErrorIfNull("LanguageTK", ERROR_NOT_FOUND, await _db.Languages.FindAsync(model.LanguageTK));

                if (ModelState.IsValid)
                {
                    Book book = new Book()
                    {
                        Title = model.Title,
                        LanguageTK = model.LanguageTK,
                        BookStateTK = "work",
                        CreationTime = DateTime.Now,
                        UserId = user.Id
                    };

                    await _db.Books.AddAsync(book);
                    await _db.SaveChangesAsync();

                    return Ok(book.Id);
                }
            }

            return BadRequest(ModelState);
        }

        // ModelErrors:
        // "User" -  ERROR_NOT_FOUND;
        // "Title" -  ERROR_TAKEN;
        // "LanguageTK" -  ERROR_NOT_FOUND;
        // "OriginalLanguageTK" -  ERROR_NOT_FOUND;
        [HttpPost]
        public async Task<IActionResult> AddTranslateBook([FromBody]AddTranslateBookVM model)
        {
            User user = await GetUserAsync();
            
            if (ModelState.IsValid)
            {
                AddModelErrorIfFalse("Title", ERROR_TAKEN, _db.Books.All(b => b.Title != model.Title));

                AddModelErrorIfNull("LanguageTK", ERROR_NOT_FOUND, await _db.Languages.FindAsync(model.LanguageTK));
                AddModelErrorIfNull("OriginalLanguageTK", ERROR_NOT_FOUND, await _db.Languages.FindAsync(model.OriginalLanguageTK));

                if (ModelState.IsValid)
                {
                    TranslateBook book = new TranslateBook()
                    {
                        Title = model.Title,
                        LanguageTK = model.LanguageTK,
                        BookStateTK = "work",
                        CreationTime = DateTime.Now,
                        UserId = user.Id,
                        OriginalLanguageTK = model.OriginalLanguageTK,
                        OriginalTitle = model.OriginalTitle
                    };

                    await _db.TranslateBooks.AddAsync(book);
                    await _db.SaveChangesAsync();

                    return Ok(book.Id);
                }
            }

            return BadRequest(ModelState);
        }

        // "BookId" - ERROR_NOT_FOUND;
        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> GetBook([FromBody]GetBookVM model)
        {
            if (ModelState.IsValid)
            {
                Book book = await _db.Books
                    .Include(b => b.Bookmarks)
                    .Include(b => b.User)
                    .Include(b => b.Chapters)
                    .Include(b => b.Comments)
                        .ThenInclude(c => c.User)
                    .FirstOrDefaultAsync(b => b.Id == model.BookId);

                AddModelErrorIfNull("BookId", ERROR_NOT_FOUND, book);

                if (ModelState.IsValid)
                {
                    User user = await _userManager.GetUserAsync(User);
                    TranslateBook translateBook = book.GetType() == typeof(TranslateBook) ? book as TranslateBook : new TranslateBook();

                    return Ok(new
                    {
                        book.Title,
                        book.AuthorName,
                        book.BookStateTK,
                        book.Description,
                        book.Discriminator,
                        book.TeamName,
                        book.LanguageTK,
                        translateBook.OriginalLanguageTK,
                        translateBook.OriginalTitle,
                        book.CoverPath,
                        book.CreationTime,
                        Bookmark = user != null ? book.Bookmarks.Any(bm => bm.UserId == user.Id) : false,
                        User = new
                        {
                            book.User.UserName,
                            book.User.AvatarPath
                        },
                        Chapters = book.Chapters.OrderBy(c => c.Index).Select(c => new
                        {
                            c.LastStateChangeTime,
                            c.ChapterStateTK,
                            c.Name,
                            c.Id
                        }),
                        Comments = book.Comments.Select(c => new
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

        [HttpPost]
        public async Task<IActionResult> EditBook([FromBody]EditBookVM model)
        {
            //User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                Dictionary<string, string> props = new Dictionary<string, string>
                {
                    { "Description", "dfdf" }
                };
                Book book = await _db.Books.FirstOrDefaultAsync(b => b.Id == 1);//model.BookId);

                if (book == null)
                    ModelState.AddModelError("BookId", ERROR_NOT_FOUND);

                if (ModelState.IsValid)
                {

                    string tableName = "Books";
                    string idName = "Id";
                    string paramsValues = PropsDictionaryToString(props);
                    return Ok(await _db.Database.ExecuteSqlCommandAsync($"UPDATE {tableName} SET {paramsValues} WHERE {idName}=1", tableName, paramsValues, idName));
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> ChangeTeam([FromBody]ChangeTeamVM model)
        {
            User user = await GetUserAsync();
            
            if (ModelState.IsValid)
            {
                Team team = await _db.Teams
                    .Include(t => t.TeamMembers)
                        .ThenInclude(t => t.User)
                    .FirstOrDefaultAsync(t => t.Name.Normalize() == model.TeamName.Normalize());

                if (team == null)
                    ModelState.AddModelError("TeamName", ERROR_NOT_FOUND);

                Book book = await _db.Books
                    .FirstOrDefaultAsync(b => b.Id == model.BookId);

                if (book == null)
                    ModelState.AddModelError("BookId", ERROR_NOT_FOUND);

                if (ModelState.IsValid)
                {
                    if (team.TeamMembers.All(p => p.UserId != user.Id))
                        ModelState.AddModelError("TeamName", ERROR_ACCESS);

                    if (book.UserId != user.Id)
                        ModelState.AddModelError("BookId", ERROR_ACCESS);

                    if (ModelState.IsValid)
                    {
                        book.TeamName = team.Name;

                        await _db.SaveChangesAsync();

                        return Ok();
                    }
                }
            }

            return BadRequest(ModelState);
        }
        [NonAction]
        string PropsDictionaryToString(Dictionary<string, string> props)
        {
            StringBuilder paramsValues = new StringBuilder();

            foreach (var prop in props)
            {
                paramsValues.Append(prop.Key);
                paramsValues.Append("='");
                paramsValues.Append(prop.Value);
                paramsValues.Append("'");
                if (props.Last().Key != prop.Key)
                    paramsValues.Append(',');
            }

            return paramsValues.ToString();
        }

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> GetUserBooks([FromBody]GetUserBooksVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _db.Users
                    .Include(u => u.Books)
                    .FirstOrDefaultAsync(u => u.NormalizedUserName == model.UserName.Normalize());

                if (user == null)
                    ModelState.AddModelError("UserName", ERROR_NOT_FOUND);

                if (ModelState.IsValid)
                {
                    List<Book> userBooks = user.Books
                        .ToList();

                    int count = userBooks.Count();
                    int page = model.Page;

                    if (count - (model.Page * model.PageSize) < 1)
                    {
                        page = count / model.PageSize;

                        if (page > 0 && count % model.PageSize == 0)
                            page--;
                    }

                    return Ok(new
                    {
                        Length = count,
                        Page = page,
                        Books = userBooks
                            .Skip(page * model.PageSize)
                            .Take(model.PageSize)
                            .Select(m => new
                            {
                                m.Title,
                                m.Id,
                                m.CoverPath
                            }).ToList()
                    });
                }

            }

            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> GetTeamBooks([FromBody]GetTeamBooksVM model)
        {
            if (ModelState.IsValid)
            {
                Team team = await _db.Teams
                    .Include(u => u.Books)
                    .FirstOrDefaultAsync(u => u.Name.Normalize() == model.TeamName.Normalize());

                if (team == null)
                    ModelState.AddModelError("TeamName", ERROR_NOT_FOUND);

                if (ModelState.IsValid)
                {
                    List<Book> teamBooks = team.Books
                        .ToList();

                    int count = teamBooks.Count();
                    int page = model.Page;

                    if (count - (model.Page * model.PageSize) < 1)
                    {
                        page = count / model.PageSize;

                        if (page > 0 && count % model.PageSize == 0)
                            page--;
                    }

                    return Ok(new
                    {
                        Length = count,
                        Page = page,
                        Books = teamBooks
                            .Skip(page * model.PageSize)
                            .Take(model.PageSize)
                            .Select(m => new
                            {
                                m.Title,
                                m.Id,
                                m.CoverPath
                            }).ToList()
                    });
                }

            }

            return BadRequest(ModelState);
        }
    }
}
