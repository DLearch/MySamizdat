using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Server.Assets;
using Server.Extensions.ModelStateDictionaryExtensions;
using Server.Models;
using Server.ViewModels.SignIn;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignInController : Controller
    {
        private UserManager<User> UserManager { get; set; }
        private SignInManager<User> SignInManager { get; set; }

        public SignInController(UserManager<User> userManager,
                                SignInManager<User> signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody]SignInPostViewModel model)
        {
            User user = await UserManager.FindByEmailAsync(model.Email);

            if (user == null)
                ModelState.AddModelError("Email", ApiError.NotFound);
            else if (!user.EmailConfirmed)
                ModelState.AddModelError("Email", ApiError.NotCompleted);
            else
            {
                Microsoft.AspNetCore.Identity.SignInResult result = await SignInManager.PasswordSignInAsync(user, model.Password, false, false);

                if (result.Succeeded)
                    return Ok();

                ModelState.AddModelError("Password", ApiError.Wrong);
            }

            return BadRequest(ModelState);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync()
        {
            await SignInManager.SignOutAsync();

            return Ok();
        }
    }
}
