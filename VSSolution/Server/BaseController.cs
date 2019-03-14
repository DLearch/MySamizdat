using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Server
{
    public class BaseController : Controller
    {
        protected const string ERROR_TAKEN = "already-taken";
        protected const string ERROR_NOT_FOUND = "not-found";
        protected const string ERROR_ACCESS = "access";
        protected const string ERROR_UNCONFIRMED = "unconfirmed";
        protected const string ERROR_WRONG = "wrong";
        protected const string ERROR_ALREADY = "already";

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

        [NonAction]
        public bool AddModelErrorIfFalse(string key, string errorMessage, bool result)
        {
            if (!result)
                ModelState.AddModelError(key, errorMessage);

            return result;
        }

        [NonAction]
        public T AddModelErrorIfNull<T>(string key, string errorMessage, T result)
        {
            if (result == null)
                ModelState.AddModelError(key, errorMessage);

            return result;
        }
    }
}
