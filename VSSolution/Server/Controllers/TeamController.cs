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

        [HttpPost, AllowAnonymous]
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

        [HttpPost]
        public async Task<IActionResult> RemoveMember([FromBody]RemoveMemberVM model)
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                Team team = await _db.Teams
                    .Include(t => t.TeamMembers)
                        .ThenInclude(t => t.User)
                    .FirstOrDefaultAsync(t => t.Name.Normalize() == model.TeamName.Normalize());

                if (team == null)
                    ModelState.AddModelError("Team", ERROR_NOT_FOUND);
                
                if (ModelState.IsValid)
                {
                    TeamMember teamMember = team.TeamMembers.FirstOrDefault(tm => tm.UserId == user.Id);
                    
                    if (AddModelErrorIfNull("User", ERROR_ACCESS, teamMember) != null)
                        AddModelErrorIfFalse("User", ERROR_ACCESS, teamMember.TeamMemberRoleTK == "head");

                    if (ModelState.IsValid)
                    {
                        TeamMember tmToRemove = team.TeamMembers.FirstOrDefault(tm => tm.User.UserName.Normalize() == model.UserName.Normalize());

                        if (tmToRemove == null)
                            ModelState.AddModelError("UserName", ERROR_NOT_FOUND);

                        if (ModelState.IsValid)
                        {
                            if (tmToRemove.Id == teamMember.Id)
                                ModelState.AddModelError("", ERROR_ACCESS);

                            if (ModelState.IsValid)
                            {
                                _db.TeamMembers.Remove(tmToRemove);

                                await _db.SaveChangesAsync();

                                return Ok();
                            }
                        }
                    }
                }
            }

            return BadRequest(ModelState);
        }
        // ModelErrors:
        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> GetUserTeams([FromBody]GetPageVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _db.Users
                    .Include(u => u.TeamMembers)
                        .ThenInclude(m => m.Team)
                    .FirstOrDefaultAsync(u => u.UserName == model.UserName);

                if (user == null)
                    ModelState.AddModelError("userName", ERROR_NOT_FOUND);

                if (ModelState.IsValid)
                {
                    List<TeamMember> userTeams = user.TeamMembers
                        .Where(m => FilterTeam(model.Filters, m))
                        .ToList();

                    int count = userTeams.Count();
                    int page = model.Page;

                    if (count - (model.Page * model.PageSize) < 1)
                    {
                        page = count / model.PageSize;

                        if (page > 0 && count % model.PageSize == 0)
                            page--;
                    }

                    return Ok(new
                    {
                        Length = count,
                        Page = page,
                        Teams = userTeams
                            .Skip(page * model.PageSize)
                            .Take(model.PageSize)
                            .Select(m => new
                            {
                                m.TeamName
                            }).ToList()
                    });
                }
                    
            }

            return BadRequest(ModelState);
        }

        [NonAction]
        bool FilterTeam(List<CatalogFilter> filters, TeamMember teamMember)
        {
            if (filters != null && teamMember != null)
                foreach (CatalogFilter filter in filters)
                {
                    switch (filter.Type)
                    {
                        case "head":
                            
                            if (teamMember.TeamMemberRoleTK == "head")
                                break;
                            else
                                return false;
                        case "search":

                            string value = filter.Value as string;

                            if (!string.IsNullOrEmpty(teamMember?.Team?.Name) && teamMember.Team.Name.Contains(value))
                                break;
                            else
                                return false;
                    }
                }
            return true;
        }

        [HttpPost]
        public async Task<IActionResult> GiveBook([FromBody]GiveBookVM model)
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
    }
}
