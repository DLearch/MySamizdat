using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class User : IdentityUser, ICreated
    {
        [Required]
        public bool EmailIsVisible { get; set; }

        public DateTime BirthDate { get; set; }

        public string AvatarPath { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }
    }
}
