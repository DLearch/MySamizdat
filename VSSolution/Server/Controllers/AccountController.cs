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
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;
        private readonly JWTGenerator _jwtGenerator;
        private readonly SignInManager<User> _signInManager;
        private readonly AppDbContext _db;

        public AccountController(
            UserManager<User> userManager
            , IConfiguration configuration
            , EmailService emailService
            , JWTGenerator jwtGenerator
            , SignInManager<User> signInManager
            , AppDbContext db
        )
        {
            _userManager = userManager;
            _configuration = configuration;
            _emailService = emailService;
            _jwtGenerator = jwtGenerator;
            _signInManager = signInManager;
            _db = db;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]RegisterVM model)
        {
            if (ModelState.IsValid)
            {
                User user = new User()
                {
                    UserName = model.UserName,
                    Email = model.Email
                };

                IdentityResult result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    await SendEmailConfirmationMessageAsync(user);

                    return Ok();
                }
                else
                    foreach (var error in result.Errors)
                        ModelState.AddModelError(error.Code, error.Description);
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> GetToken([FromBody]GetTokenVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.FindByEmailAsync(model.Email);

                if (user != null)
                {
                    Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);

                    if (result.Succeeded)
                    {
                        return Ok(new GetTokenRVM()
                        {
                            UserName = user.UserName,
                            Token = _jwtGenerator.Generate(user)
                        });
                    }
                    else
                        ModelState.AddModelError("Password", "wrong");
                }
                else
                    ModelState.AddModelError("Email", "not-found");
            }

            return BadRequest(ModelState);
        }
        
        [HttpPost]
        public async Task<IActionResult> SendEmailConfirmationMessage()
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                    if (!user.EmailConfirmed)
                    {
                        await SendEmailConfirmationMessageAsync(user);

                        return Ok();
                    }
                    else
                        ModelState.AddModelError("Email", "already-confirmed");
                else
                    ModelState.AddModelError("Email", "not-found");
            }

            return BadRequest(ModelState);
        }

        [NonAction]
        private async Task SendEmailConfirmationMessageAsync(User user)
        {
            string token = HttpUtility.UrlEncode(await _userManager.GenerateEmailConfirmationTokenAsync(user));
            string callbackUrl = $"https://localhost:44314/confirm-email?email={user.Email}&token={token}";

            await _emailService.SendMessageAsync(
                user.Email
                , "Confirm your account"
                , $"Подтвердите регистрацию, перейдя по <a href='{callbackUrl}'>ссылке</a>"
            );
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail([FromBody]ConfirmEmailVM model)
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

                        return Ok(new ConfirmEmailRVM()
                        {
                            UserName = user.UserName,
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
                            Id = user.Id
                            , UserName = user.UserName
                            , Email = user.Email
                            , BirthDate = user.BirthDate
                            , EmailConfirmed = user.EmailConfirmed
                            , EmailIsVisible = user.EmailIsVisible
                        }
                    });
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
                    IdentityResult result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

                    if (result.Succeeded)
                        return Ok();
                    else
                        foreach (var error in result.Errors)
                            ModelState.AddModelError(error.Code, error.Description);
                }
                else
                    ModelState.AddModelError("UserName", "not-found");
            }

            return BadRequest(ModelState);
        }
    }
}
