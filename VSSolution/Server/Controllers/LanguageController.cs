using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Authorize]
    public class LanguageController : BaseController
    {
        public LanguageController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Get() => Ok(_db.Languages.Select(l => l.TK).ToList());

        [HttpPost]
        [AllowAnonymous]
        public ActionResult GetBookStateTKs() => Ok(_db.BookStates.Select(p => p.TK).ToList());
    }
}
