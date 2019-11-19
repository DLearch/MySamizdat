using Server.Attributes.ValidationAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.SignIn
{
    public class SignInPostViewModel
    {
        [Email]
        [HasValue]
        public string Email { get; set; }

        [Password]
        [HasValue]
        public string Password { get; set; }
    }
}
