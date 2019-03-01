using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Language
{
    public class RemoveVM
    {
        [RequiredVM]
        public string LanguageTK { get; set; }
    }
}
