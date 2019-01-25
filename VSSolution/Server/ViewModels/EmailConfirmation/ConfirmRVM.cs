using Server.Models;
using Server.Validators;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.EmailConfirmation
{
    public class ConfirmRVM
    {
        [MyRequired]
        public User User { get; set; }

        [MyRequired]
        public string Token { get; set; }
    }
}
