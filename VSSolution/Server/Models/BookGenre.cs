using Server.Models.Books;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class BookGenre
    {
        public int GenreId { get; set; }
        public Genre Genre { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; }
    }
}
