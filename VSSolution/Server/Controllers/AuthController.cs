﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Server.Models;
using Server.Services;
using Server.ViewModels.Auth;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Server.Controllers
{
    [Authorize]
    public class AuthController : BaseController
    {
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;
        private readonly SignInManager<User> _signInManager;

        public AuthController(
            UserManager<User> userManager
            , IConfiguration configuration
            , EmailService emailService
            , SignInManager<User> signInManager
            , AppDbContext db
        ) : base(userManager, db)
        {
            _configuration = configuration;
            _emailService = emailService;
            _signInManager = signInManager;
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

        // ModelErrors:
        // "Email" - ERROR_NOT_FOUND;
        // "Email" - ERROR_UNCONFIRMED;
        // "Password" - ERROR_WRONG;
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> GetToken([FromBody]GetTokenVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.FindByEmailAsync(model.Email);

                AddModelErrorIfNull("Email", ERROR_NOT_FOUND, user);

                if (ModelState.IsValid)
                {
                    //AddModelErrorIfFalse("Email", ERROR_UNCONFIRMED, user.EmailConfirmed);

                    if (ModelState.IsValid)
                    {
                        bool signInSucceeded = (await _signInManager.PasswordSignInAsync(user, model.Password, false, false)).Succeeded;
                        AddModelErrorIfFalse("Password", ERROR_WRONG, signInSucceeded);
                        
                        if (ModelState.IsValid)
                            return Ok(new
                            {
                                user.UserName,
                                Token = GenerateJWTToken(user),
                                user.BirthDate,
                                user.AvatarPath
                            });
                    }
                }
            }

            return BadRequest(ModelState);
        }

        // ModelErrors:
        // "Email" - ALREADY;
        // "User" -  ERROR_NOT_FOUND;
        [HttpPost]
        public async Task<IActionResult> SendEmailConfirmationMessage()
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                AddModelErrorIfFalse("Email", ERROR_ALREADY, !user.EmailConfirmed);

                if (ModelState.IsValid)
                {
                    await SendEmailConfirmationMessageAsync(user);

                    return Ok();
                }
            }

            return BadRequest(ModelState);
        }

        // ModelErrors:
        // "Email" - ERROR_NOT_FOUND;
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail([FromBody]ConfirmEmailVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.FindByEmailAsync(model.Email);
                AddModelErrorIfNull("Email", ERROR_NOT_FOUND, user);

                if (ModelState.IsValid)
                {
                    IdentityResult result = await _userManager.ConfirmEmailAsync(user, model.Token);

                    if (result.Succeeded)
                    {
                        await _signInManager.SignInAsync(user, false);

                        return Ok(new
                        {
                            user.UserName,
                            Token = GenerateJWTToken(user),
                            user.BirthDate,
                            user.AvatarPath
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
        public string GenerateJWTToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["Jwt:ExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
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
    }
}
