using Runoo.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.ViewModels.AuthController
{
    public class LoginViewModel
    {
        [Required, Email]
        public string Email { get; set; }

        [Required, Password]
        public string Password { get; set; }
    }
}
