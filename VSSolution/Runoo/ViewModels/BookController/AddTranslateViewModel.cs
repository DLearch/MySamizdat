using Runoo.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.ViewModels.BookController
{
    public class AddTranslateViewModel : AddViewModel
    {
        [Required]
        public string OriginalTitle { get; set; }

        [Required]
        public string OriginalLanguageTK { get; set; }
    }
}
