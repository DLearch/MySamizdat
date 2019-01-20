using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;
using Server.ViewModels.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    public class AuthenticationController : Controller
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly JWTGenerator _jwtGenerator;

        public AuthenticationController(
            UserManager<User> userManager
            , SignInManager<User> signInManager
            , JWTGenerator jwtGenerator
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
        }

        [HttpPost]
        public async Task<IActionResult> Index([FromBody]AuthenticationVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.FindByEmailAsync(model.Email);

                if (user != null)
                {
                    Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);

                    if (result.Succeeded)
                    {
                        //await _userManager.ResetAccessFailedCountAsync(user);

                        return Ok(new AuthenticationRVM()
                        {
                            Name = user.UserName,
                            Token = _jwtGenerator.Generate(user)
                        });
                    }
                    else
                    {
                        //await _userManager.AccessFailedAsync(user);

                        ModelState.AddModelError("Password", "wrong");
                    }
                }
                else
                    ModelState.AddModelError("Email", "not-found");
            }

            return BadRequest(ModelState);
        }
    }
}
