using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Runoo.Attributes;
using Runoo.Models;
using Runoo.ViewModels;
using Runoo.ViewModels.TeamController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Controllers
{
    [Authorize]
    public class TeamController : BaseController
    {
        public TeamController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]AddViewModel model)
        {
            // Get suppliant
            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null)
            {
                return Unauthorized();
            }

            if (ModelState.IsValid)
            {
                if (_db.Users.Any(u => u.UserName.ToUpperInvariant() == model.TeamName.ToUpperInvariant()) && _db.Teams.All(t => t.Name.ToUpperInvariant() == model.TeamName.ToUpperInvariant()))
                    ModelState.AddModelError("TeamName", ERROR_TAKEN);

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
                        UserId = suppliant.Id,
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
        public async Task<IActionResult> Get([Required]string id) // id is userName
        {
            if (ModelState.IsValid)
            {
                Team team = await _db.Teams
                    .Include(t => t.TeamMembers)
                        .ThenInclude(t => t.User)
                    .FirstOrDefaultAsync(t => t.Name.ToUpperInvariant() == id.ToUpperInvariant());

                if (team == null)
                    return NotFound();

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

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> GetPage([FromBody]CatalogPageViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            User suppliant = await _userManager.GetUserAsync(User);

            List<Team> teams = _db.Teams
                .Include(p => p.TeamMembers)
                    .ThenInclude(p => p.User)
                .ToList()
                .Where(p => Filter(model.Filters, p))
                .ToList();

            int count = teams.Count();
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
                Teams = teams
                    .Skip(page * model.PageSize)
                    .Take(model.PageSize)
                    .Select(m => new
                    {
                        m.Name
                    }).ToList()
            });
        }

        [HttpPost]
        public async Task<IActionResult> Update([Required]string id , UpdateViewModel model)// id is userName
        {
            // Check if model is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Team teamToUpdate = await _db.Teams
                    .Include(t => t.TeamMembers)
                    .FirstOrDefaultAsync(t => t.Name.ToUpperInvariant() == id.ToUpperInvariant());

            if (teamToUpdate == null)
            {
                return NotFound();
            }

            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null || teamToUpdate.TeamMembers.All(p => p.UserId != suppliant.Id))
            {
                return Unauthorized();
            }

            teamToUpdate.Description = model.Description;

            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> Delete([Required]string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Team teamToDelete = await _db.Teams
                .Include(t => t.TeamMembers)
                    .ThenInclude(t => t.User)
                .FirstOrDefaultAsync(t => t.Name.ToUpperInvariant() == id.ToUpperInvariant());

            if (teamToDelete == null)
            {
                return NotFound();
            }

            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null || teamToDelete.TeamMembers.All(p => p.UserId != suppliant.Id && p.TeamMemberRoleTK != "head"))
            {
                return Unauthorized();
            }

            _db.Teams.Remove(teamToDelete);

            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> InviteMember([Required]string id, [FromBody]InviteMemberViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Team team = await _db.Teams
                .Include(t => t.TeamMembers)
                    .ThenInclude(t => t.User)
                .FirstOrDefaultAsync(t => t.Name.ToUpperInvariant() == id.ToUpperInvariant());

            if (team == null)
            {
                return NotFound();
            }

            User suppliant = await _userManager.GetUserAsync(User);
            TeamMember suppliantTeamMember = team.TeamMembers.FirstOrDefault(p => p.UserId == suppliant.Id);
            if (suppliant == null || suppliantTeamMember == null || suppliantTeamMember.TeamMemberRoleTK != "head")
            {
                return Unauthorized();
            }

            User newMember = await _db.Users.FirstOrDefaultAsync(u => u.UserName.ToUpperInvariant() == model.UserName.ToUpperInvariant());

            if (newMember == null)
                ModelState.AddModelError("UserName", ERROR_NOT_FOUND);

            if (team.TeamMembers.Any(p => p.UserId == newMember.Id))
                ModelState.AddModelError("UserName", ERROR_ALREADY);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            TeamInviteNotification oldNotification = await _db.TeamInviteNotifications
                .FirstOrDefaultAsync(p => p.UserId == newMember.Id && p.TeamName == team.Name);
            if (oldNotification == null)
            {
                TeamInviteNotification invite = new TeamInviteNotification()
                {
                    CreationTime = DateTime.Now,
                    IsChecked = false,
                    TeamMemberId = suppliantTeamMember.Id,
                    TeamName = team.Name,
                    UserId = newMember.Id
                };

                await _db.AddAsync(invite);
            }
            else
            {
                oldNotification.CreationTime = DateTime.Now;
            }

            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> RespondInvitation([Required]string id, [FromBody]RespondInvitationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Team team = await _db.Teams
                .Include(p => p.Invites)
                .Include(t => t.TeamMembers)
                    .ThenInclude(t => t.User)
                .FirstOrDefaultAsync(t => t.Name.ToUpperInvariant() == id.ToUpperInvariant());

            if (team == null)
            {
                return NotFound();
            }

            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null)
            {
                return Unauthorized();
            }

            if (model.Accept)
            {
                TeamMember teamMember = new TeamMember()
                {
                    UserId = suppliant.Id,
                    CreationTime = DateTime.Now,
                    TeamMemberRoleTK = "member",
                    TeamName = team.Name
                };

                await _db.TeamMembers.AddAsync(teamMember);
            }

            foreach (var invite in team.Invites.Where(p => p.UserId == suppliant.Id))
            {
                _db.TeamInviteNotifications.Remove(invite);
            }

            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> DeleteMember([Required]string id, [FromBody]DeleteMemberViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Team team = await _db.Teams
                .Include(p => p.TeamMembers)
                    .ThenInclude(p => p.User)
                .FirstOrDefaultAsync(p => p.Name.ToUpperInvariant() == id.ToUpperInvariant());

            if (team == null)
                return NotFound();

            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null || team.TeamMembers.All(p => p.UserId != suppliant.Id && p.TeamMemberRoleTK != "head"))
            {
                return Unauthorized();
            }

            TeamMember teamMemberToDelete = team.TeamMembers
                .FirstOrDefault(p => p.User.NormalizedUserName == model.UserName.ToUpperInvariant());

            if (teamMemberToDelete == null)
                ModelState.AddModelError("UserName", ERROR_NOT_FOUND);

            if (team.TeamMembers.Count <= 1 || teamMemberToDelete.User.Id == suppliant.Id)
                ModelState.AddModelError("UserName", ERROR_ACCESS);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            _db.TeamMembers.Remove(teamMemberToDelete);

            await _db.SaveChangesAsync();

            return NoContent();
        }

        [NonAction]
        private bool Filter(List<FilterViewModel> filters, Team team, User user = null)
        {
            if (filters == null || team == null)
                return true;

            foreach (var filter in filters)
            {
                switch (filter.Type)
                {
                    case "member":

                        string userName = filter.Value as string;

                        if (team.TeamMembers.All(p => p.User.NormalizedUserName != userName.ToUpperInvariant()))
                            return false;

                        break;
                    case "search":

                        string value = filter.Value as string;

                        if (!string.IsNullOrEmpty(team?.Name) && team.Name.Contains(value))
                            break;
                        else
                            return false;
                    default:
                        break;
                }
            }

            return true;
        }
    }
}
