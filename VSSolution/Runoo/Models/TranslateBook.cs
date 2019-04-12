using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Models
{
    public class TranslateBook : Book
    {
        [Required]
        public string OriginalTitle { get; set; }

        [Required]
        public string OriginalLanguageTK { get; set; }
        public Language OriginalLanguage { get; set; }
    }
}
