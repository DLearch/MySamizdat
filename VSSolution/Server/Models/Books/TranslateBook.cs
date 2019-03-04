using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Books
{
    public class TranslateBook : Book
    {
        [Required]
        public string OriginalTitle { get; set; }

        //public int OriginalBookId { get; set; }
        //public Book OriginalBook { get; set; }
        
        public string OriginalLanguageId { get; set; }
        public Language OriginalLanguage { get; set; }

        //public int TranslateStateId { get; set; }
        //public TranslateBookState TranslateState { get; set; }
        //public string TranslateStateComment { get; set; }
    }
}
