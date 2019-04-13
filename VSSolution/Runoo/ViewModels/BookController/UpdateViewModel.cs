using Runoo.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.ViewModels.BookController
{
    public class UpdateViewModel
    {
        [Required]
        public string Title { get; set; }

        public string Description { get; set; }
        
        public string AuthorName { get; set; }

        [Required]
        public string LanguageTK { get; set; }

        [Required]
        public string StateTK { get; set; }
        public string StateComment { get; set; }

        [Required, Name]
        public string UserName { get; set; }

        [Name]
        public string TeamName { get; set; }
    }
}
