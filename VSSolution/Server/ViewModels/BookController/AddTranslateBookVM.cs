using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.BookController
{
    public class AddTranslateBookVM : AddBookVM
    {
        [RequiredVM]
        public string OriginalTitle { get; set; }

        [RequiredVM]
        public string OriginalLanguageTK { get; set; }
    }
}
