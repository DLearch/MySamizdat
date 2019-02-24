using Server.Models.Books;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.States
{
    public class BookState: State
    {
        public List<Book> Books { get; set; }
    }
}
