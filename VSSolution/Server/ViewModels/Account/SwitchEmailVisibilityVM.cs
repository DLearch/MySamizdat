using Server.Validators;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Account
{
    public class SwitchEmailVisibilityVM
    {
        [MyRequired]
        public bool EmailIsVisible { get; set; }
    }
}
