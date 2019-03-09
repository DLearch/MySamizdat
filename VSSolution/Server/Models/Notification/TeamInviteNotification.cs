using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Notification
{
    public class TeamInviteNotification : Notification
    {
        public int TeamId { get; set; }
        public Team.Team Team { get; set; }
    }
}
