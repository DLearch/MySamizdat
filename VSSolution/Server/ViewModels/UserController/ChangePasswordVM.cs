using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.UserController
{
    public class ChangePasswordVM
    {
        [RequiredVM]
        [PasswordVM]
        public string CurrentPassword { get; set; }

        [RequiredVM]
        [PasswordVM]
        public string NewPassword { get; set; }
    }
}
