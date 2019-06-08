using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Runoo.Attributes;
using Runoo.Models;
using Runoo.Services;
using Runoo.ViewModels.UserController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Controllers
{
    [Authorize]
    public class UserController : BaseController
    {
        private FilesStorage _filesStorage;
        private EmailService _emailService;
        private IConfiguration _config;

        public UserController(
            UserManager<User> userManager
            , AppDbContext db
            , FilesStorage filesStorage,
            EmailService emailService,
            IConfiguration config
        ) : base(userManager, db)
        {
            _filesStorage = filesStorage;
            _emailService = emailService;
            _config = config;
        }

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> Get([Required]string id) // id is userName
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            User user = await _userManager.FindByNameAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            User suppliant = await _userManager.GetUserAsync(User);

            bool accesed = false;
            if (suppliant != null && user.UserName == suppliant.UserName)
                accesed = true;

            return Ok(new
            {
                Email = accesed || user.EmailIsVisible ? user.Email : null,
                user.EmailIsVisible,
                user.AvatarPath,
                Teams = _db.TeamMembers.Where(m => m.UserId == user.Id).Select(m => new
                {
                    Name = m.TeamName,
                    RoleRK = m.TeamMemberRoleTK
                }).ToList()
            });
        }

        [HttpPost]
        public async Task<IActionResult> ChangeEmailVisibility([FromBody]ChangeEmailVisibilityViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null)
            {
                return Unauthorized();
            }

            suppliant.EmailIsVisible = model.Visible;

            IdentityResult result = await _userManager.UpdateAsync(suppliant);

            if (result.Succeeded)
                return Ok();
            else
                foreach (var error in result.Errors)
                    ModelState.AddModelError(error.Code, error.Description);

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null)
            {
                return Unauthorized();
            }

            IdentityResult result = await _userManager.ChangePasswordAsync(suppliant, model.CurrentPassword, model.NewPassword);

            if (result.Succeeded)
                return Ok();
            else
                foreach (var error in result.Errors)
                    ModelState.AddModelError(error.Code, error.Description);

            return BadRequest(ModelState);
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> ChangeAvatar([FromForm]ChangeAvatarViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null)
            {
                return Unauthorized();
            }

            string currentAvatar = suppliant.AvatarPath;

            try
            {
                if (model.Avatar != null)
                    suppliant.AvatarPath = await _filesStorage.SaveAsync(model.Avatar);
                else
                    suppliant.AvatarPath = null;
                
                IdentityResult result = await _userManager.UpdateAsync(suppliant);

                if (!result.Succeeded)
                    foreach (var error in result.Errors)
                        ModelState.AddModelError(error.Code, error.Description);
            }
            catch (Exception e)
            {
                suppliant.AvatarPath = currentAvatar;

                IdentityResult result = await _userManager.UpdateAsync(suppliant);

                if (result.Succeeded)
                    return BadRequest(e.Message);
                else
                    foreach (var error in result.Errors)
                        ModelState.AddModelError(error.Code, error.Description);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                if (currentAvatar != null)
                    _filesStorage.Delete(currentAvatar);
            }
            catch (Exception) { }

            return Ok(new { suppliant.AvatarPath });
        }

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> SendEmail([FromBody]SendEmailViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User suppliant = await _userManager.GetUserAsync(User);

            await _emailService.SendMessageAsync(_config["Email:Address"], "Support", model.Message + "; " + model.SenderEmail + "; " + suppliant?.UserName);
            return Ok();
        }
    }
}
