using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class BookComment : Comment
    {
        [Required]
        public int BookId { get; set; }
        public Book Book { get; set; }
    }
}
