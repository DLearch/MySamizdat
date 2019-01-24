using Server.Validators;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.PasswordChange
{
    public class PasswordChangeVM
    {
        [MyRequired]
        [Password]
        public string OldPassword { get; set; }

        [MyRequired]
        [Password]
        public string NewPassword { get; set; }
    }
}
