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
    public class CatalogController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _db;

        public CatalogController(
            UserManager<User> userManager
            , AppDbContext db
        )
        {
            _userManager = userManager;
            _db = db;
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult GetPage([FromBody]GetPageVM model)
        {
            if (ModelState.IsValid)
                return Ok(new
                {
                    Length = _db.Books.Count(),
                    Books = _db.Books.Skip(model.Page * model.PageSize).Take(model.PageSize).Select(b => new
                    {
                        b.Id,
                        b.Title
                    }).ToList()
                });

            return BadRequest(ModelState);
        }
    }
}
