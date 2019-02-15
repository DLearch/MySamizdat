using Microsoft.AspNetCore.Identity;
using Server.Validators;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class User : IdentityUser
    {
        [Required]
        public bool EmailIsVisible { get; set; }

        public List<Book> Books { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        public List<Comment> Comments { get; set; }

        public User GetPublicCopy() => new User()
        {
            Id = Id
            , Email = EmailIsVisible && EmailConfirmed ? Email : null
            , UserName = UserName
            , EmailIsVisible = EmailIsVisible
            , Books = Books
        };

        public User GetPrivateCopy() => new User()
        {
            Id = Id
            , Email = Email
            , UserName = UserName
            , EmailIsVisible = EmailIsVisible
            , EmailConfirmed = EmailConfirmed
            , BirthDate = BirthDate
            , Books = Books
        };
    }
}
