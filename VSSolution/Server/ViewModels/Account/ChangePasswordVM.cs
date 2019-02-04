using Server.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Account
{
    public class ChangePasswordVM
    {
        [MyRequired]
        [Password]
        public string OldPassword { get; set; }

        [MyRequired]
        [Password]
        public string NewPassword { get; set; }
    }
}
