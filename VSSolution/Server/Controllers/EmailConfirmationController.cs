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
        public async Task<IActionResult> SendConfirmationMessage([FromBody]SendConfirmationMessageVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.FindByEmailAsync(model.Email);

                if (user == null)
                    ModelState.AddModelError("Email", "email-not-found");
                else
                {
                    ConfirmVM valuesModel = new ConfirmVM()
                    {
                        Email = user.Email,
                        Token = await _userManager.GenerateEmailConfirmationTokenAsync(user)
                    };

                    string callbackUrl = Url.Action(
                        "ConfirmEmail",
                        "Registration",
                        valuesModel,
                        protocol: HttpContext.Request.Scheme
                    );

                    await _emailService.SendEmailAsync(
                        user.Email
                        , "Confirm your account"
                        , $"Подтвердите регистрацию, перейдя по <a href='{callbackUrl}'>ссылке</a>"
                    );

                    return Ok();
                }
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
                    ModelState.AddModelError("Email", "email-not-found");
                else
                {
                    IdentityResult result = await _userManager.ConfirmEmailAsync(user, model.Token);

                    if (result.Succeeded)
                    {
                        await _signInManager.SignInAsync(user, false);

                        return Ok(new ConfirmRVM()
                        {
                            Name = user.UserName,
                            Token = _jwtGenerator.Generate(user)
                        });
                    }
                    else
                        foreach (var error in result.Errors)
                            ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            return BadRequest(ModelState);
        }
    }
}
