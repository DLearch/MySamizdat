using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Language
    {
        [Key]
        [Required]
        public string TK { get; set; }

        [InverseProperty("Language")]
        public List<Book> Books { get; set; }

        [InverseProperty("OriginalLanguage")]
        public List<TranslateBook> TranslateBooks { get; set; }
    }
}
