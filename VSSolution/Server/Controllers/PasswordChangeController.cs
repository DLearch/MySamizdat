using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.ViewModels.PasswordChange;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    public class PasswordChangeController : Controller
    {
        private readonly UserManager<User> _userManager;

        public PasswordChangeController(
            UserManager<User> userManager
        )
        {
            _userManager = userManager;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Index([FromBody]PasswordChangeVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.FindByNameAsync(model.Name);

                if (user != null)
                {
                    IdentityResult result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

                    if (result.Succeeded)
                        return Ok();
                    else
                        foreach (var error in result.Errors)
                            ModelState.AddModelError(string.Empty, error.Description);
                }
                else
                    ModelState.AddModelError("UserName", "not-found");
            }

            return BadRequest(ModelState);
        }
    }
}
