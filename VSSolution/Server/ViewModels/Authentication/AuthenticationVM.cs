using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Authentication
{
    public class AuthenticationVM
    {
        [Required(ErrorMessage = "empty")]
        [EmailAddress(ErrorMessage = "wrong")]
        public string Email { get; set; }

        [Required(ErrorMessage = "empty")]
        [RegularExpression(@"(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$", ErrorMessage = "wrong")]
        public string Password { get; set; }
    }
}
