using Server.Validators;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.EmailConfirmation
{
    public class ConfirmVM
    {
        [MyRequired]
        [MyEmailAddress]
        public string Email { get; set; }

        [MyRequired]
        public string Token { get; set; }
    }
}
