using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.ViewModels.Catalog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    public class CatalogController : BaseController
    {
        public CatalogController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult GetPage([FromBody]GetPageVM model)
        {
            if (ModelState.IsValid)
            {
                int bookCount = _db.Books.Count();
                int page = model.Page;

                if (bookCount - (model.Page * model.PageSize) < 1)
                {
                    page = bookCount / model.PageSize;

                    if (page > 0 && bookCount % model.PageSize == 0)
                        page--;
                }

                return Ok(new
                {
                    Length = _db.Books.Count(),
                    Page = page,
                    Books = _db.Books.Skip(page * model.PageSize).Take(model.PageSize).Select(b => new
                    {
                        b.Id,
                        b.Title,
                        b.CoverPath
                    }).ToList()
                });
            }

            return BadRequest(ModelState);
        }
    }
}
