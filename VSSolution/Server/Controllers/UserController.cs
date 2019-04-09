using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;
using Server.ViewModels.UserController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Authorize]
    public class UserController : BaseController
    {
        private FilesStorage _filesStorage;

        public UserController(
            UserManager<User> userManager
            , AppDbContext db
            , FilesStorage filesStorage
        ) : base(userManager, db)
        {
            _filesStorage = filesStorage;
        }

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> GetUser([FromBody]GetUserVM model)
        {
            if (ModelState.IsValid)
            {
                User user = _userManager.Users.FirstOrDefault(b => b.UserName == model.UserName);
                
                AddModelErrorIfNull("User", ERROR_NOT_FOUND, user);
                
                if (ModelState.IsValid)
                {
                    User currentUser = await _userManager.GetUserAsync(User);

                    bool accesed = false;
                    if (currentUser != null && currentUser.UserName == model.UserName)
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
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> ChangeEmailVisibility([FromBody]ChangeEmailVisibilityVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                user.EmailIsVisible = model.Visible;

                IdentityResult result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                    return Ok();
                else
                    foreach (var error in result.Errors)
                        ModelState.AddModelError(error.Code, error.Description);
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                IdentityResult result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

                if (result.Succeeded)
                    return Ok();
                else
                    foreach (var error in result.Errors)
                        ModelState.AddModelError(error.Code, error.Description);
            }

            return BadRequest(ModelState);
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> ChangeAvatar([FromForm]ChangeAvatarVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                string currentAvatar = user.AvatarPath;

                try
                {
                    if (model.Avatar != null)
                        user.AvatarPath = await _filesStorage.SaveAsync(model.Avatar);
                    else
                        user.AvatarPath = null;


                    IdentityResult result = await _userManager.UpdateAsync(user);

                    if (!result.Succeeded)
                        foreach (var error in result.Errors)
                            ModelState.AddModelError(error.Code, error.Description);
                }
                catch (Exception e)
                {
                    user.AvatarPath = currentAvatar;

                    IdentityResult result = await _userManager.UpdateAsync(user);

                    if (result.Succeeded)
                        return BadRequest(e.Message);
                    else
                        foreach (var error in result.Errors)
                            ModelState.AddModelError(error.Code, error.Description);
                }

                if (ModelState.IsValid)
                {
                    try
                    {
                        if (currentAvatar != null)
                            _filesStorage.Delete(currentAvatar);
                    }
                    catch(Exception)
                    {
                        return Ok(new { user.AvatarPath });
                    }
                    return Ok(new { user.AvatarPath });
                }
            }

            return BadRequest(ModelState);
        }
    }
}
