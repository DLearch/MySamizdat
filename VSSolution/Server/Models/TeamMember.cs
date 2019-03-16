using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class TeamMember
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        [Required]
        public string TeamName { get; set; }
        public Team Team { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }
        
        [Required]
        public string TeamMemberRoleTK { get; set; }
        public TeamMemberRole TeamMemberRoles { get; set; }

        public List<TeamInviteNotification> Invites { get; set; }
    }
}
