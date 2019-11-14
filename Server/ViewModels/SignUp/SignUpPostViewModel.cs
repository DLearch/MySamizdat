using Server.Attributes.ValidationAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.SignUp
{
    public class SignUpPostViewModel
    {
        [HasValue]
        [Email]
        public string Email { get; set; }

        [HasValue]
        [Name]
        public string UserName { get; set; }

        [HasValue]
        [Password]
        public string Password { get; set; }
    }
}
