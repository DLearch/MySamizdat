using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.BookController
{
    public class UpdateVM
    {
        [RequiredVM]
        public string Title { get; set; }

        public string Description { get; set; }

        [UserNameVM]
        public string AuthorName { get; set; }

        [RequiredVM]
        public string LanguageTK { get; set; }
        
        [RequiredVM]
        public string StateTK { get; set; }
        public string StateComment { get; set; }

        [RequiredVM, UserNameVM]
        public string UserName { get; set; }

        public string TeamName { get; set; }

        public string OriginalTitle { get; set; }

        public string OriginalLanguageTK { get; set; }
    }
}
