using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Account
{
    public class SwitchEmailVisibilityVM
    {
        [RequiredVM]
        public bool EmailIsVisible { get; set; }
    }
}
