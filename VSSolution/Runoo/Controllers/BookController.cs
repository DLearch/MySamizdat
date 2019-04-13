using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Runoo.Models;
using Runoo.ViewModels;
using Runoo.ViewModels.BookController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Controllers
{
    [Authorize]
    public class BookController : BaseController
    {
        public BookController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]AddViewModel model)
        {
            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null)
            {
                return Unauthorized();
            }

            if (ModelState.IsValid)
            {
                await ValidateTitleAsync(model.Title);
                await ValidateLanguageAsync(model.LanguageTK);

                if (ModelState.IsValid)
                {
                    Book book = new Book()
                    {
                        Title = model.Title,
                        LanguageTK = model.LanguageTK,
                        BookStateTK = "work",
                        CreationTime = DateTime.Now,
                        UserId = suppliant.Id
                    };

                    await _db.Books.AddAsync(book);
                    await _db.SaveChangesAsync();

                    return Ok(book.Id);
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> AddTranslate([FromBody]AddTranslateViewModel model)
        {
            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null)
            {
                return Unauthorized();
            }

            if (ModelState.IsValid)
            {
                await ValidateTitleAsync(model.Title);
                await ValidateLanguageAsync(model.LanguageTK);
                await ValidateOriginalLanguageAsync(model.OriginalLanguageTK);
                
                if (ModelState.IsValid)
                {
                    TranslateBook book = new TranslateBook()
                    {
                        Title = model.Title,
                        LanguageTK = model.LanguageTK,
                        BookStateTK = "work",
                        CreationTime = DateTime.Now,
                        UserId = suppliant.Id,
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

        [HttpPost, AllowAnonymous]
        public async Task<ActionResult<Book>> Get(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Book book = await _db.Books
                .Include(b => b.Bookmarks)
                .Include(b => b.User)
                .Include(b => b.Chapters)
                .Include(b => b.Comments)
                    .ThenInclude(c => c.User)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (book == null)
                return NotFound();

            User suppliant = await _userManager.GetUserAsync(User);
            TranslateBook translateBook = book.GetType() == typeof(TranslateBook) ? book as TranslateBook : new TranslateBook();

            return Ok(new
            {
                book.Title,
                book.AuthorName,
                book.BookStateTK,
                book.BookStateComment,
                book.Description,
                book.Discriminator,
                book.TeamName,
                book.LanguageTK,
                translateBook.OriginalLanguageTK,
                translateBook.OriginalTitle,
                book.CoverPath,
                book.CreationTime,
                Bookmark = suppliant != null ? book.Bookmarks.Any(bm => bm.UserId == suppliant.Id) : false,
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

        [HttpPost, AllowAnonymous]
        public async Task<ActionResult<Book>> GetPage([FromBody]CatalogPageViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            User suppliant = await _userManager.GetUserAsync(User);

            List<Book> books = _db.Books
                    .Include(p => p.Bookmarks)
                    .Include(p => p.User)
                    .ToList()
                    .Where(p => Filter(model.Filters, p, suppliant))
                    .ToList();

            int bookCount = books.Count();
            int page = model.Page;

            if (bookCount - (model.Page * model.PageSize) < 1)
            {
                page = bookCount / model.PageSize;

                if (page > 0 && bookCount % model.PageSize == 0)
                    page--;
            }

            return Ok(new
            {
                Length = bookCount,
                Page = page,
                Books = books
                    .Skip(page * model.PageSize)
                    .Take(model.PageSize)
                    .Select(b => new
                    {
                        b.Id,
                        b.Title,
                        b.CoverPath
                    }).ToList()
            });
        }

        [HttpPost]
        public async Task<IActionResult> Bookmark(int id, [FromBody]BookmarkViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Book book = await _db.Books
                .Include(b => b.Bookmarks)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (book == null)
                return NotFound();

            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null)
            {
                return Unauthorized();
            }

            Bookmark bookmark = book.Bookmarks.FirstOrDefault(p => p.UserId == suppliant.Id);

            if (model.Bookmarked && bookmark == null)
            {
                book.Bookmarks.Add(new Bookmark()
                {
                    BookId = id,
                    UserId = suppliant.Id
                });

                await _db.SaveChangesAsync();
            }
            else
            {
                if (bookmark != null)
                {
                    _db.Bookmarks.Remove(bookmark);
                    await _db.SaveChangesAsync();
                }
            }
            
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Update(int id, [FromBody]UpdateViewModel model)
        {
            return await UpdateBookAsync(id, model);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTranslate(int id, [FromBody]UpdateTranslateViewModel model)
        {
            return await UpdateBookAsync(id, model);
        }

        [NonAction]
        private async Task ValidateTitleAsync(string title, Book book = null)
        {
            //Check if title is unique
            if ((book == null || book.Title != title) && await _db.Books.AnyAsync(p => p.Title == title))
            {
                ModelState.AddModelError("Title", ERROR_TAKEN);
            }
        }
        [NonAction]
        private async Task ValidateLanguageAsync(string languageTK)
        {
            // Check if language exists
            if (await _db.Languages.FindAsync(languageTK) == null)
            {
                ModelState.AddModelError("LanguageTK", ERROR_NOT_FOUND);
            }
        }
        [NonAction]
        private async Task ValidateStateAsync(string stateTK)
        {
            // Check if state exists
            if (await _db.BookStates.FindAsync(stateTK) == null)
            {
                ModelState.AddModelError("StateTK", ERROR_NOT_FOUND);
            }
        }
        [NonAction]
        private async Task<User> ValidateUserAsync(string userName)
        {
            // Get user and check if it exists
            User user = await _db.Users.FirstOrDefaultAsync(p => p.UserName.ToUpperInvariant() == userName.ToUpperInvariant());
            if (user == null)
            {
                ModelState.AddModelError("UserName", ERROR_NOT_FOUND);
            }
            return user;
        }
        [NonAction]
        private async Task ValidateTeamAsync(string teamName, User suppliant)
        {
            // Сheck if team exists and suppliant has access rights
            if (!string.IsNullOrEmpty(teamName))
            {
                Team team = await _db.Teams.Include(p => p.TeamMembers).FirstOrDefaultAsync(p => p.Name.ToUpperInvariant() == teamName.ToUpperInvariant());
                if (team == null)
                {
                    ModelState.AddModelError("TeamName", ERROR_NOT_FOUND);
                }
                else
                {
                    if (team.TeamMembers.All(p => p.UserId != suppliant.Id))
                    {
                        ModelState.AddModelError("TeamName", ERROR_ACCESS);
                    }
                }
            }
        }
        [NonAction]
        private async Task ValidateOriginalLanguageAsync(string originalLanguageTK)
        {
            // Check if language exists
            if (await _db.Languages.FindAsync(originalLanguageTK) == null)
            {
                ModelState.AddModelError("OriginalLanguageTK", ERROR_NOT_FOUND);
            }
        }

        [NonAction]
        private async Task<IActionResult> UpdateBookAsync(int id, UpdateViewModel model)
        {
            // Check if model is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Get book and check if it exists
            Book bookToUpdate = await _db.Books.FindAsync(id);
            if (bookToUpdate == null)
            {
                return NotFound();
            }

            // Get suppliant and check if he has access rights
            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null || suppliant.Id != bookToUpdate.UserId)
            {
                return Unauthorized();
            }

            await ValidateTitleAsync(model.Title, bookToUpdate);
            await ValidateLanguageAsync(model.LanguageTK);
            await ValidateStateAsync(model.StateTK);
            await ValidateTeamAsync(model.TeamName, suppliant);
            User user = await ValidateUserAsync(model.UserName);

            if (model is UpdateTranslateViewModel)
            {
                UpdateTranslateViewModel translateModel = model as UpdateTranslateViewModel;

                await ValidateOriginalLanguageAsync(translateModel.OriginalLanguageTK);
            }

            // Check if model is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Create author if he is not exists
            if (!string.IsNullOrEmpty(model.AuthorName))
            {
                if (await _db.Authors.FindAsync(model.AuthorName) == null)
                    await _db.Authors.AddAsync(entity: new Author() { Name = model.AuthorName });
            }
            else
            {
                model.AuthorName = null;
            }

            if (string.IsNullOrEmpty(model.TeamName))
            {
                model.TeamName = null;
            }

            // Update fields
            bookToUpdate.Title = model.Title;
            bookToUpdate.Description = model.Description;
            bookToUpdate.AuthorName = model.AuthorName;
            bookToUpdate.LanguageTK = model.LanguageTK;
            bookToUpdate.BookStateTK = model.StateTK;
            bookToUpdate.BookStateComment = model.StateComment;
            bookToUpdate.UserId = user.Id;
            bookToUpdate.TeamName = model.TeamName;

            // If book is translate then update translate fields
            if (model is UpdateTranslateViewModel)
            {
                UpdateTranslateViewModel translateModel = model as UpdateTranslateViewModel;
                TranslateBook translateBookToUpdate = bookToUpdate as TranslateBook;

                translateBookToUpdate.OriginalTitle = translateModel.OriginalTitle;
                translateBookToUpdate.OriginalLanguageTK = translateModel.OriginalLanguageTK;
            }
            
            await _db.SaveChangesAsync();

            return NoContent();
        }

        [NonAction]
        private bool Filter(List<FilterViewModel> filters, Book book, User user = null)
        {
            if (filters == null || book == null)
                return true;

            foreach (var filter in filters)
            {
                string value = filter.Value as string;
                switch (filter.Type)
                {
                    case "team":

                        string teamName = filter.Value as string;
                        if (book?.TeamName?.ToUpperInvariant() != teamName?.ToUpperInvariant())
                        {
                            return false;
                        }

                        break;
                    case "user":

                        string userName = filter.Value as string;
                        if (book?.User?.UserName?.ToUpperInvariant() != userName?.ToUpperInvariant())
                        {
                            return false;
                        }

                        break;

                    case "translate":

                        if (book is TranslateBook)
                        {
                            if ((filter.Value as bool?) == false)
                            {
                                return false;
                            }
                        }
                        else
                        {
                            if ((filter.Value as bool?) == true)
                            {
                                return false;
                            }
                        }

                        break;

                    case "bookmark":
                        
                        if (user != null 
                            && !string.IsNullOrEmpty(user.Id) 
                            && book.Bookmarks != null 
                            && book.Bookmarks.Any(b => b.UserId == user.Id))
                        {
                            if ((filter.Value as bool?) == false || value == "false")
                            {
                                return false;
                            }
                        }
                        else
                        {
                            if ((filter.Value as bool?) == true || value == "true")
                            {
                                return false;
                            }
                        }

                        break;

                    case "search":


                        if (!string.IsNullOrEmpty(book.Title) && book.Title.ToUpperInvariant().Contains(value.ToUpperInvariant())
                            || !string.IsNullOrEmpty(book.AuthorName) && book.AuthorName.ToUpperInvariant().Contains(value.ToUpperInvariant())
                            || !string.IsNullOrEmpty(book.TeamName) && book.TeamName.ToUpperInvariant().Contains(value.ToUpperInvariant())
                            || book.User != null && !string.IsNullOrEmpty(book.User.UserName) && book.User.UserName.ToUpperInvariant().Contains(value.ToUpperInvariant())
                            || !string.IsNullOrEmpty(book.Discriminator) && book is TranslateBook
                            && !string.IsNullOrEmpty((book as TranslateBook).OriginalTitle) && (book as TranslateBook).OriginalTitle.ToUpperInvariant().Contains(value.ToUpperInvariant()))
                            break;
                        else
                            return false;
                }
            }

            return true;
        }
    }
}
