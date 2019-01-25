using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Team
    {
        public int Id { get; set; }

        public string TeamName { get; set; }

        public List<TeamMember> Members { get; set; }

        public Team GetPublicCopy() => new Team()
        {
            Id = Id
            , TeamName = TeamName
        };

        public Team GetPrivateCopy() => new Team()
        {
            Id = Id
            , TeamName = TeamName
        };
    }
}
