using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
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

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]AddVM model)
        {
            User user = await GetUserAsync();
            AddModelError("Name", ERROR_TAKEN, _db.Teams.Any(t => t.Name == model.Name));

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

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Get([FromBody]GetVM model)
        {
            if (ModelState.IsValid)
            {
                Team team = AddModelError("Team", ERROR_NOT_FOUND, await _db.Teams
                    .Include(t => t.Members)
                        .ThenInclude(t => t.User)
                    .FirstOrDefaultAsync(t => t.Id == model.TeamId));

                if (ModelState.IsValid)
                    return Ok(new
                    {
                        team.Name,
                        team.Description,
                        Members = team.Members.Select(m => new
                        {
                            m.User.UserName
                        })
                    });
            }

            return BadRequest(ModelState);
        }
    }
}
