using Microsoft.AspNetCore.Identity;
using Server.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class User : IdentityUser
    {
        [MyRequired]
        public bool EmailIsVisible { get; set; }

        public List<TeamMember> Teams { get; set; }
        
        [MyRequired]
        public DateTime BirthDate { get; set; }

        //public List<string> Languages { get; set; }

        public User GetPublicCopy() => new User()
        {
            Id = Id
            , Email = EmailIsVisible && EmailConfirmed ? Email : null
            , UserName = UserName
            , EmailIsVisible = EmailIsVisible
        };

        public User GetPrivateCopy() => new User()
        {
            Id = Id
            , Email = Email
            , UserName = UserName
            , EmailIsVisible = EmailIsVisible
            , EmailConfirmed = EmailConfirmed
            , BirthDate = BirthDate
        };
    }
}
