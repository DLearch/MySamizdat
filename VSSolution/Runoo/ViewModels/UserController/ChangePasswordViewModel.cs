using Runoo.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.ViewModels.UserController
{
    public class ChangePasswordViewModel
    {
        [Required, Password]
        public string CurrentPassword { get; set; }

        [Required, Password]
        public string NewPassword { get; set; }
    }
}
