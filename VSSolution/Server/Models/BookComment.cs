using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class BookComment : Comment
    {
        public int BookId { get; set; }
        public Book Book { get; set; }
    }
}
