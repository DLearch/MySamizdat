using Server.Models.Books;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.States
{
    public class TranslateBookState : State
    {
        public List<TranslateBook> TranslateBooks { get; set; }
    }
}
