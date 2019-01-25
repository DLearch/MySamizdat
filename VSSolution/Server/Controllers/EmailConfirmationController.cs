using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Server.Models;
using Server.Services;
using Server.ViewModels.EmailConfirmation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    public class EmailConfirmationController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;
        private readonly JWTGenerator _jwtGenerator;
        private readonly SignInManager<User> _signInManager;

        public EmailConfirmationController(
            UserManager<User> userManager
            , IConfiguration configuration
            , EmailService emailService
            , JWTGenerator jwtGenerator
            , SignInManager<User> signInManager
        )
        {
            _userManager = userManager;
            _configuration = configuration;
            _emailService = emailService;
            _jwtGenerator = jwtGenerator;
            _signInManager = signInManager;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SendConfirmationMessage()
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                    if (!user.EmailConfirmed)
                    {
                        await _emailService.SendEmailConfirmationMessageAsync(user);

                        return Ok();
                    }
                    else
                        ModelState.AddModelError("Email", "already-confirmed");
                else
                    ModelState.AddModelError("Email", "not-found");
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> Confirm([FromBody]ConfirmVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.FindByEmailAsync(model.Email);

                if (user == null)
                    ModelState.AddModelError("Email", "not-found");
                else
                {
                    IdentityResult result = await _userManager.ConfirmEmailAsync(user, model.Token);

                    if (result.Succeeded)
                    {
                        await _signInManager.SignInAsync(user, false);

                        return Ok(new ConfirmRVM()
                        {
                            User = user,
                            Token = _jwtGenerator.Generate(user)
                        });
                    }
                    else
                        foreach (var error in result.Errors)
                            ModelState.AddModelError(error.Code, error.Description);
                }
            }

            return BadRequest(ModelState);
        }
    }
}
