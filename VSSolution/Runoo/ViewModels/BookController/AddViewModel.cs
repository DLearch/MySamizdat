using Runoo.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.ViewModels.BookController
{
    public class AddViewModel
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string LanguageTK { get; set; }
    }
}
