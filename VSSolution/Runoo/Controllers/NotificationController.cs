using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Runoo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Controllers
{
    [Authorize]
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
            User suppliant = await _userManager.GetUserAsync(User);
            if (suppliant == null)
            {
                return Unauthorized();
            }

            List<object> list = new List<object>();

            foreach (var n in _db.Users.Include(u => u.Notifications).First(u => u.Id == suppliant.Id).Notifications)
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
    }
}
