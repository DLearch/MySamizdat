using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    public class NotificationController : BaseController
    {
        public NotificationController(
            UserManager<User> userManager
            , AppDbContext db
        ) : base(userManager, db)
        { }

        [HttpPost]
        public async Task<IActionResult> Get()
        {
            User user = await GetUserAsync();

            if (ModelState.IsValid)
            {
                List<object> list = new List<object>();

                foreach (var n in _db.Users.Include(u => u.Notifications).First(u => u.Id == user.Id).Notifications)
                {
                    TeamInviteNotification teamInvite = null;
                    switch (n.Discriminator)
                    {
                        case "TeamInviteNotification":
                            teamInvite = await _db.TeamInviteNotifications
                                .Include(t => t.Team)
                                .Include(t => t.TeamMember)
                                    .ThenInclude(t => t.User)
                                .FirstAsync(ntf => ntf.Id == n.Id);

                            break;
                    }
                    list.Add(new
                    {
                        n.Id,
                        n.CreationTime,
                        n.IsChecked,
                        n.Discriminator,
                        TeamName = teamInvite?.Team.Name,
                        InviterName = teamInvite?.TeamMember.User.UserName
                    });
                }

                return Ok(list);
            }

            return BadRequest(ModelState);
        }
    }
}
