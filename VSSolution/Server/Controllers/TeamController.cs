using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.ViewModels.TeamController;
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
        public async Task<IActionResult> AddTeam([FromBody]AddTeamVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                AddModelErrorIfFalse("Name", ERROR_TAKEN, _db.Users.All(u => u.UserName != model.TeamName) && _db.Teams.All(t => t.Name != model.TeamName));

                if (ModelState.IsValid)
                {
                    Team team = new Team()
                    {
                        Name = model.TeamName,
                        CreationTime = DateTime.Now
                    };

                    await _db.AddAsync(team);

                    await _db.SaveChangesAsync();

                    TeamMember teamMember = new TeamMember()
                    {
                        TeamName = model.TeamName,
                        CreationTime = DateTime.Now,
                        UserId = user.Id,
                        TeamMemberRoleTK = "head"
                    };

                    await _db.AddAsync(teamMember);

                    await _db.SaveChangesAsync();

                    return Ok(team.CreationTime);
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> GetTeam([FromBody]GetTeamVM model)
        {
            if (ModelState.IsValid)
            {
                Team team = await _db.Teams
                    .Include(t => t.TeamMembers)
                        .ThenInclude(t => t.User)
                    .FirstOrDefaultAsync(t => t.Name == model.TeamName);

                AddModelErrorIfNull("Team", ERROR_NOT_FOUND, team);

                if (ModelState.IsValid)
                    return Ok(new
                    {
                        team.Name,
                        team.Description,
                        Members = team.TeamMembers.Select(m => new
                        {
                            m.User.UserName,
                            m.User.AvatarPath,
                            RoleTK = m.TeamMemberRoleTK
                        })
                    });
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> InviteMember([FromBody]InviteMemberVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                Team team = await _db.Teams
                    .Include(t => t.TeamMembers)
                        .ThenInclude(t => t.User)
                    .FirstOrDefaultAsync(t => t.Name == model.TeamName);

                AddModelErrorIfNull("Team", ERROR_NOT_FOUND, team);

                User newMember = await _db.Users.FirstOrDefaultAsync(u => u.UserName == model.UserName);
                AddModelErrorIfNull("UserName", ERROR_NOT_FOUND, newMember);

                if (ModelState.IsValid)
                {
                    TeamMember teamMember = team.TeamMembers.FirstOrDefault(tm => tm.UserId == user.Id);

                    if (AddModelErrorIfNull("User", ERROR_ACCESS, teamMember) != null)
                        AddModelErrorIfFalse("User", ERROR_ACCESS, teamMember.TeamMemberRoleTK == "head");
                    
                    if (ModelState.IsValid)
                    {
                        TeamInviteNotification invite = new TeamInviteNotification()
                        {
                            CreationTime = DateTime.Now,
                            IsChecked = false,
                            TeamMemberId = teamMember.Id,
                            TeamName = team.Name,
                            UserId = newMember.Id
                        };

                        await _db.AddAsync(invite);

                        await _db.SaveChangesAsync();

                        return Ok();
                    }
                }
            }

            return BadRequest(ModelState);
        }
        [HttpPost]
        public async Task<IActionResult> RespondInvitation([FromBody]RespondInvitationVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                TeamInviteNotification teamInvite = await _db.TeamInviteNotifications.FindAsync(model.InvitationId);

                AddModelErrorIfNull("InvitationId", ERROR_NOT_FOUND, teamInvite);

                if (ModelState.IsValid)
                {
                    if (model.Accept)
                    {
                        TeamMember teamMember = new TeamMember()
                        {
                            UserId = user.Id,
                            CreationTime = DateTime.Now,
                            TeamMemberRoleTK = "member",
                            TeamName = teamInvite.TeamName
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
    }
}
