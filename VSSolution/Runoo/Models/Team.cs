using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Models
{
    public class Team
    {
        [Key]
        public string Name { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        public string Description { get; set; }

        public List<Book> Books { get; set; }

        public List<TeamMember> TeamMembers { get; set; }

        public List<TeamInviteNotification> Invites { get; set; }
    }
}
