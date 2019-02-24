using Server.Models.Books;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Genre
    {
        public int Id { get; set; }

        public string TK { get; set; }

        public List<BookGenre> Books { get; set; }
    }
}
