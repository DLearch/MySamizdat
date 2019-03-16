using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class TeamInviteNotification : Notification
    {
        [Required]
        public string TeamName { get; set; }
        public Team Team { get; set; }

        [Required]
        public int TeamMemberId { get; set; }
        public TeamMember TeamMember { get; set; }
    }
}
