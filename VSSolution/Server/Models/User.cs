using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class User : IdentityUser
    {
        public bool EmailIsVisible { get; set; }

        public List<TeamMember> Teams { get; set; }

        public List<Notification> Notifications { get; set; }

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
        };
    }
}
