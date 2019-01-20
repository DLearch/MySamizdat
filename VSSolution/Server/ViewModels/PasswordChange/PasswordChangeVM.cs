using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.PasswordChange
{
    public class PasswordChangeVM
    {
        [Required(ErrorMessage = "empty")]
        public string Name { get; set; }

        [Required(ErrorMessage = "empty")]
        [RegularExpression(@"(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$", ErrorMessage = "wrong")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "empty")]
        [RegularExpression(@"(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$", ErrorMessage = "wrong")]
        public string NewPassword { get; set; }
    }
}
