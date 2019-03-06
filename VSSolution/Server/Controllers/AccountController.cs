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
        private readonly AppDbContext _db;
        private readonly FilesStorage _filesStorage;

        public AccountController(
            UserManager<User> userManager,
            AppDbContext db,
            FilesStorage filesStorage
        )
        {
            _userManager = userManager;
            _db = db;
            _filesStorage = filesStorage;
        }

        [HttpPost]
        public async Task<IActionResult> GetInfo()
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                    return Ok(new
                    {
                        user.Email,
                        user.EmailIsVisible,
                        Teams = _db.TeamMembers.Where(tm => tm.UserId == user.Id).Select(tm => new
                        {
                            tm.Team.Id,
                            tm.Team.Name
                        }).ToList()
                    });
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> ChangeEmailVisibility([FromBody]SwitchEmailVisibilityVM model)
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
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    IdentityResult result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

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

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> ChangeAvatar(ChangeAvatarVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    if (user.AvatarPath != null)
                        _filesStorage.Delete(user.AvatarPath);

                    if (model.Avatar != null)
                        user.AvatarPath = await _filesStorage.SaveAsync(model.Avatar);
                    else
                        user.AvatarPath = null;

                    IdentityResult result = await _userManager.UpdateAsync(user);

                    if (result.Succeeded)
                        return Ok(user.AvatarPath);
                    else
                        foreach (var error in result.Errors)
                            ModelState.AddModelError(error.Code, error.Description);
                    
                }
                else
                    ModelState.AddModelError("User", "not-found");
            }

            return BadRequest(ModelState);
        }
    }
}
