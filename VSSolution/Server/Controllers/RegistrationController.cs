using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Server.Models;
using Server.Services;
using Server.ViewModels.EmailConfirmation;
using Server.ViewModels.Registration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    public class RegistrationController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;
        private readonly JWTGenerator _jwtGenerator;
        private readonly SignInManager<User> _signInManager;

        public RegistrationController(
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
        public async Task<IActionResult> Index([FromBody]RegistrationVM model)
        {
            if (ModelState.IsValid)
            {
                User user = new User()
                {
                    UserName = model.Name,
                    Email = model.Email
                };

                IdentityResult result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    ConfirmVM valuesModel = new ConfirmVM()
                    {
                        Email = user.Email,
                        Token = await _userManager.GenerateEmailConfirmationTokenAsync(user)
                    };

                    string callbackUrl = Url.Action(
                        "",
                        "sign-up",
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
                else
                    foreach (var error in result.Errors)
                        ModelState.AddModelError(string.Empty, error.Description);
            }

            return BadRequest(ModelState);
        }
    }
}
