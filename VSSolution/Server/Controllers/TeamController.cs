using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Notification;
using Server.Models.Team;
using Server.ViewModels.Team;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Authorize]
    public class TeamController : BaseController
    {
        public TeamController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        // ModelErrors:
        // "Name" - ERROR_TAKEN;
        // "User" -  ERROR_NOT_FOUND;
        [HttpPost]
        public async Task<IActionResult> Add([FromBody]AddVM model)
        {
            User user = await GetUserAsync();
            AddModelErrorIfFalse("Name", ERROR_TAKEN, _db.Teams.Any(t => t.Name == model.Name));

            if (ModelState.IsValid)
            {
                Team team = new Team()
                {
                    Name = model.Name
                };

                await _db.AddAsync(team);

                await _db.SaveChangesAsync();

                TeamMember teamMember = new TeamMember()
                {
                    TeamId = team.Id,
                    UserId = user.Id,
                    IsOwner = true
                };

                await _db.AddAsync(teamMember);

                await _db.SaveChangesAsync();

                return Ok(team.Id);
            }

            return BadRequest(ModelState);
        }

        // ModelErrors:
        // "Team" - ERROR_NOT_FOUND;
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Get([FromBody]GetVM model)
        {
            if (ModelState.IsValid)
            {
                Team team = await _db.Teams
                    .Include(t => t.Members)
                        .ThenInclude(t => t.User)
                    .FirstOrDefaultAsync(t => t.Id == model.TeamId);

                AddModelErrorIfNull("Team", ERROR_NOT_FOUND, team);

                if (ModelState.IsValid)
                    return Ok(new
                    {
                        team.Name,
                        team.Description,
                        Members = team.Members.Select(m => new
                        {
                            m.User.UserName,
                            m.IsOwner
                        })
                    });
            }

            return BadRequest(ModelState);
        }

        // ModelErrors:
        // "Team" - ERROR_NOT_FOUND;
        // "User" -  ERROR_ACCESS;
        // "User" -  ERROR_NOT_FOUND;
        // "UserName" - ERROR_NOT_FOUND;
        [HttpPost]
        public async Task<IActionResult> InviteMember([FromBody]AddMemberVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                Team team = await _db.Teams
                    .Include(t => t.Members)
                        .ThenInclude(t => t.User)
                    .FirstOrDefaultAsync(t => t.Id == model.TeamId);

                AddModelErrorIfNull("Team", ERROR_NOT_FOUND, team);

                if (team != null)
                {
                    TeamMember teamMember = team.Members.FirstOrDefault(tm => tm.UserId == user.Id);

                    if (AddModelErrorIfNull("User", ERROR_ACCESS, teamMember) != null)
                        AddModelErrorIfFalse("User", ERROR_ACCESS, teamMember.IsOwner);
                }
                
                User newMember = await _db.Users.FirstOrDefaultAsync(u => u.UserName == model.UserName);

                AddModelErrorIfNull("UserName", ERROR_NOT_FOUND, newMember);

                if (ModelState.IsValid)
                {
                    TeamInviteNotification invite = new TeamInviteNotification()
                    {
                        CreationTime = DateTime.Now,
                        IsChecked = false,
                        TeamId = team.Id,
                        UserId = newMember.Id
                    };

                    await _db.AddAsync(invite);

                    await _db.SaveChangesAsync();

                    return Ok();
                }
            }

            return BadRequest(ModelState);
        }

        // ModelErrors:
        // "Team" - ERROR_NOT_FOUND;
        // "User" -  ERROR_NOT_FOUND;
        // "User" -  ERROR_ACCESS;
        // "InvitationId" -  ERROR_NOT_FOUND;
        // "UserName" - ERROR_NOT_FOUND;
        [HttpPost]
        public async Task<IActionResult> RespondInvitation([FromBody]RespondInvitationVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                TeamInviteNotification teamInvite = await _db.TeamInviteNotifications.FindAsync(model.InvitationId);

                AddModelErrorIfNull("InvitationId", ERROR_NOT_FOUND, teamInvite);

                if(ModelState.IsValid)
                {
                    if (model.Accept)
                    {
                        TeamMember teamMember = new TeamMember()
                        {
                            UserId = user.Id,
                            IsOwner = false,
                            TeamId = teamInvite.TeamId
                        };

                        await _db.TeamMembers.AddAsync(teamMember);
                    }

                    _db.TeamInviteNotifications.Remove(teamInvite);

                    await _db.SaveChangesAsync();

                    return Ok();
                }
            }

            return BadRequest(ModelState);
        }

        // ModelErrors:
        // "User" -  ERROR_NOT_FOUND;
        [HttpPost]
        public async Task<IActionResult> RemoveMember([FromBody]RemoveMemberVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                Team team = await _db.Teams
                    .Include(t => t.Members)
                        .ThenInclude(t => t.User)
                    .FirstOrDefaultAsync(t => t.Id == model.TeamId);

                AddModelErrorIfNull("Team", ERROR_NOT_FOUND, team);

                if (team != null)
                {
                    TeamMember teamMember = team.Members.FirstOrDefault(tm => tm.UserId == user.Id);

                    if (AddModelErrorIfNull("User", ERROR_ACCESS, teamMember) != null)
                    {
                        AddModelErrorIfFalse("User", ERROR_ACCESS, teamMember.IsOwner);

                    }
                }
                
                if (ModelState.IsValid)
                {
                    TeamMember teamMember = team.Members.FirstOrDefault(m => m.User.UserName == model.UserName);

                    AddModelErrorIfNull("UserName", ERROR_NOT_FOUND, teamMember);

                    if (ModelState.IsValid)
                    {
                        _db.TeamMembers.Remove(teamMember);
                        await _db.SaveChangesAsync();

                        return Ok();
                    }
                }
            }

            return BadRequest(ModelState);
        }
    }
}
