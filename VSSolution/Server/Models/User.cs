﻿using Microsoft.AspNetCore.Identity;
using Server.Validators;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class User : IdentityUser
    {
        [Required]
        public bool EmailIsVisible { get; set; }
        
        public DateTime BirthDate { get; set; }
        
        public string AvatarPath { get; set; }
        
        public List<Book> Books { get; set; }

        public List<Comment> Comments { get; set; }

        public List<Bookmark> Bookmarks { get; set; }

        public List<BookEvaluation> BookEvaluations { get; set; }

        public List<TeamMember> TeamMembers { get; set; }

        public List<Notification> Notifications { get; set; }
    }
}
