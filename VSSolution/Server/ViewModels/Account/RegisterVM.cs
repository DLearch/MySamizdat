using Server.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Account
{
    public class RegisterVM
    {
        [MyRequired]
        [MyEmailAddress]
        public string Email { get; set; }

        [MyRequired]
        [UserName]
        public string UserName { get; set; }

        [MyRequired]
        [Password]
        public string Password { get; set; }
    }
}
