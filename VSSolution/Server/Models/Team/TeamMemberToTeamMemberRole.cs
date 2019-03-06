using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Team
{
    public class TeamMemberToTeamMemberRole
    {
        public int Id { get; set; }

        public string TeamMemeberRoleId { get; set; }
        public TeamMemberRole TeamMemberRole { get; set; }

        public int TeamMemberId { get; set; }
        public TeamMember TeamMember { get; set; }
    }
}
