using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Runoo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Controllers
{
    [NonController]
    public class BaseController : Controller
    {
        protected const string ERROR_TAKEN = "already-taken";
        protected const string ERROR_NOT_FOUND = "not-found";
        protected const string ERROR_ACCESS = "access";
        protected const string ERROR_UNCONFIRMED = "unconfirmed";
        protected const string ERROR_WRONG = "wrong";
        protected const string ERROR_ALREADY = "already";
        protected const string ERROR_EMPTY = "empty";

        protected readonly UserManager<User> _userManager;
        protected readonly AppDbContext _db;

        public BaseController(
            UserManager<User> userManager
            , AppDbContext db
        )
        {
            _userManager = userManager;
            _db = db;
        }

        [NonAction]
        public async Task<User> GetUserAsync()
        {
            User user = await _userManager.GetUserAsync(User);

            if (user == null)
                ModelState.AddModelError("User", ERROR_NOT_FOUND);

            return user;
        }
    }
}
