using Server.Validators;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Authentication
{
    public class AuthenticationVM
    {
        [MyRequired]
        [MyEmailAddress]
        public string Email { get; set; }

        [MyRequired]
        [Password]
        public string Password { get; set; }
    }
}
