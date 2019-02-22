using Microsoft.AspNetCore.Identity;
using Server.Models.Comments;
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
        
        public DateTime BirthDate { get; set; }
        
        public List<Book> Books { get; set; }

        public string AvatarPath { get; set; }

        public List<Comment> Comments { get; set; }
        public List<BookComment> BookComments { get; set; }
        public List<ChapterComment> ChapterComments { get; set; }

        public Language MainLanguage { get; set; }
    }
}
