using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
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
        public UserController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        [HttpPost]
        [AllowAnonymous]
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
    }
}
