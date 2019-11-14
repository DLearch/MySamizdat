using Server.Attributes.ValidationAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.SignUp
{
    public class SignUpCompleteWithEmailViewModel
    {
        [Email]
        [HasValue]
        public string Email { get; set; }

        [HasValue]
        public string Token { get; set; }
    }
}
