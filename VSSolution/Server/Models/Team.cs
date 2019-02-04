using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Team
    {
        public int Id { get; set; }

        [Required]
        public string TeamName { get; set; }

        [Required]
        public bool isPersonal { get; set; }

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
