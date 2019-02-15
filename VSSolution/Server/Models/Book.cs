using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Book
    {
        public int Id { get; set; }
        
        public string Title { get; set; }

        public string OwnerId { get; set; }
        public User Owner { get; set; }

        public List<Chapter> Chapters { get; set; }
        public List<BookComment> Comments { get; set; }
    }
}
