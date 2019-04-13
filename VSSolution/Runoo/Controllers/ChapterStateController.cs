using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Runoo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Controllers
{
    [Authorize]
    public class ChapterStateController : BaseController
    {
        public ChapterStateController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        [HttpPost, AllowAnonymous]
        public ActionResult Get() => Ok(_db.ChapterStates.Select(p => p.TK).ToList());
    }
}
