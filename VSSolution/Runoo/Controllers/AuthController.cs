using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Runoo.Models;
using Runoo.Services;
using Runoo.ViewModels.AuthController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Runoo.Controllers
{
    [Authorize]
    public class AuthController : BaseController
    {
        private readonly EmailService _emailService;
        private readonly SignInManager<User> _signInManager;

        public AuthController(
            UserManager<User> userManager
            , EmailService emailService
            , SignInManager<User> signInManager
            , AppDbContext db
        ) : base(userManager, db)
        {
            _emailService = emailService;
            _signInManager = signInManager;
        }

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
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

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                User user = await GetUserByEmailAsync(model.Email);

                if (ModelState.IsValid)
                {
                    //if (!user.EmailConfirmed)
                    //    ModelState.AddModelError("Email", ERROR_UNCONFIRMED);

                    if (ModelState.IsValid)
                    {
                        if (!(await _signInManager.PasswordSignInAsync(user, model.Password, false, false)).Succeeded)
                            ModelState.AddModelError("Password", ERROR_WRONG);

                        if (ModelState.IsValid)
                            return Ok(new
                            {
                                user.UserName,
                                user.BirthDate,
                                user.AvatarPath,
                                Teams = _db.TeamMembers.Where(p => p.UserId == user.Id).Select(p => new
                                {
                                    p.TeamName,
                                    p.TeamMemberRoleTK
                                }).ToList()
                            });
                    }
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> SignOut()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> SendEmailConfirmationMessage()
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                if (user.EmailConfirmed)
                    ModelState.AddModelError("Email", ERROR_ALREADY);

                if (ModelState.IsValid)
                {
                    await SendEmailConfirmationMessageAsync(user);

                    return Ok();
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail([FromBody]ConfirmEmailViewModel model)
        {
            if (ModelState.IsValid)
            {
                User user = await GetUserByEmailAsync(model.Email);

                if (ModelState.IsValid)
                {
                    IdentityResult result = await _userManager.ConfirmEmailAsync(user, model.Token);

                    if (result.Succeeded)
                    {
                        await _signInManager.SignInAsync(user, false);

                        return Ok(new
                        {
                            user.UserName,
                            user.BirthDate,
                            user.AvatarPath,
                            Teams = _db.TeamMembers.Where(p => p.UserId == user.Id).Select(p => new
                            {
                                p.TeamName,
                                p.TeamMemberRoleTK
                            }).ToList()
                        });
                    }
                    else
                        foreach (var error in result.Errors)
                            ModelState.AddModelError(error.Code, error.Description);
                }
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

        [NonAction]
        public async Task<User> GetUserByEmailAsync(string email)
        {
            User user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                ModelState.AddModelError("Email", ERROR_NOT_FOUND);

            return user;
        }
    }
}
