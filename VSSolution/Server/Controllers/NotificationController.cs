using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Notification;
using Server.Models.Team;
using Server.ViewModels.Notification;
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

                foreach (var n in _db.Notifications.Where(n => n.UserId == user.Id))
                {
                    Team team = null;
                    switch (n.Discriminator)
                    {
                        case "TeamInviteNotification":
                            TeamInviteNotification teamInvite = n as TeamInviteNotification;
                            team = await _db.Teams
                                .Include(t => t.Members)
                                    .ThenInclude(t => t.User)
                                .FirstAsync(t => t.Id == teamInvite.TeamId);

                            break;
                    }
                    list.Add(new
                    {
                        n.Id,
                        n.CreationTime,
                        n.IsChecked,
                        n.Discriminator,
                        TeamId = team?.Id,
                        TeamName = team?.Name,
                        InviterName = team?.Members.First(m => m.IsOwner).User.UserName
                    });
                }

                return Ok(list);
            }

            return BadRequest(ModelState);
        }
    }
}
