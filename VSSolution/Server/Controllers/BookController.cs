using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Server.Models;
using Server.Services;
using Server.ViewModels.Book;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Authorize]
    public class BookController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly BookManager _bookManager;
        private readonly AppDbContext _db;

        public BookController(
            UserManager<User> userManager
            , IConfiguration configuration
            , BookManager bookManager
            , AppDbContext db
        )
        {
            _userManager = userManager;
            _configuration = configuration;
            _bookManager = bookManager;
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]AddVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if(user != null)
                {
                    return Ok(new AddRVM()
                    {
                        Id = await _bookManager.CreateBookAsync(model.Title, user.Id)
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
                return Ok(new GetRVM()
                {
                    Book = await _bookManager.GetBookByIdAsync(model.Id)
                });
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> Delete([FromBody]DeleteVM model)
        {
            if (ModelState.IsValid)
            {
                await _bookManager.DeleteBookByIdAsync(model.Id);

                return Ok();
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
                    Length = _bookManager.GetBooksCount()
                    , Books = _db.Books.Skip(model.page * model.pageSize).Take(model.pageSize).ToList()
                });

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> Comment([FromBody]CommentVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    await _bookManager.CreateCommentAsync(model.Content, user.Id, model.BookId, model.ParentId);

                    return Ok();
                }
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }
    }
}
