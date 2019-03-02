using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.ViewModels.Team;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Authorize]
    public class TeamController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _db;

        public TeamController(
            UserManager<User> userManager
            , AppDbContext db
        )
        {
            _userManager = userManager;
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]AddVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user == null)
                    ModelState.AddModelError("User", "not-found");
                else
                {
                    if (_db.Teams.Any(t => t.Name == model.Name))
                        ModelState.AddModelError("Name", "already-taken");
                    else
                    {
                        Team team = new Team()
                        {
                            Name = model.Name
                        };

                        await _db.AddAsync(team);

                        await _db.SaveChangesAsync();

                        return Ok(team.Id);
                    }
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Get([FromBody]GetVM model)
        {
            if (ModelState.IsValid)
            {
                Team team = await _db.Teams.FindAsync(model.TeamId);

                if (team == null)
                    ModelState.AddModelError("Team", "not-found");
                else
                {
                    return Ok(new
                    {
                        team.Name,
                        team.Description
                    });
                }
            }

            return BadRequest(ModelState);
        }
    }
}
