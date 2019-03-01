using Server.Models.Books;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Bookmark
    {
        public string UserId { get; set; }
        public User User { get; set; }
            
        public int BookId { get; set; }
        public Book Book { get; set; }
    }
}
