using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Admin
{
    public class AddLanguageVM
    {
        [RequiredVM]
        public string LanguageTK { get; set; }
    }
}
