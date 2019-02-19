using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Server.Models;
using Server.Services;
using Server.ViewModels.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Server.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _db;

        public AccountController(
            UserManager<User> userManager
            , AppDbContext db
        )
        {
            _userManager = userManager;
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> GetUser()
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                    return Ok(new GetUserRVM()
                    {
                        User = new User()
                        {
                            Id = user.Id,
                            UserName = user.UserName,
                            Email = user.Email,
                            BirthDate = user.BirthDate,
                            EmailConfirmed = user.EmailConfirmed,
                            EmailIsVisible = user.EmailIsVisible
                        }
                    });
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> ChangeEmailVisibility([FromBody]SwitchEmailVisibilityVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    user.EmailIsVisible = model.EmailIsVisible;

                    IdentityResult result = await _userManager.UpdateAsync(user);

                    if (result.Succeeded)
                        return Ok();
                    else
                        foreach (var error in result.Errors)
                            ModelState.AddModelError(error.Code, error.Description);
                }
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }
        
        [HttpPost]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    IdentityResult result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

                    if (result.Succeeded)
                        return Ok();
                    else
                        foreach (var error in result.Errors)
                            ModelState.AddModelError(error.Code, error.Description);
                }
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }
    }
}
