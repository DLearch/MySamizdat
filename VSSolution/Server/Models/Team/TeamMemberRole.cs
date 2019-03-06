using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Team
{
    public class TeamMemberRole
    {
        public string Id { get; set; }

        public List<TeamMemberToTeamMemberRole> Members { get; set; }
    }
}
