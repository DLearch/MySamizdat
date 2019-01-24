using Server.Validators;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Registration
{
    public class RegistrationVM
    {
        [MyRequired]
        [MyEmailAddress]
        public string Email { get; set; }

        [MyRequired]
        [UserName]
        public string Name { get; set; }

        [MyRequired]
        [Password]
        public string Password { get; set; }
    }
}
