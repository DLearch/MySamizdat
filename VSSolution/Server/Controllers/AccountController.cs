using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.ViewModels.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;

        public AccountController(
            UserManager<User> userManager
        )
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> SwitchEmailVisibility([FromBody]SwitchEmailVisibilityVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    user.EmailIsVisible = model.EmailIsVisible;

                    IdentityResult result = await _userManager.UpdateAsync(user);

                    if(result.Succeeded)
                        return Ok(new SwitchEmailVisibilityRVM()
                        {
                            EmailIsVisible = user.EmailIsVisible
                        });
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
        public async Task<IActionResult> GetUser()
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                    return Ok(new GetUserRVM()
                    {
                        User = user
                    });
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }
    }
}
