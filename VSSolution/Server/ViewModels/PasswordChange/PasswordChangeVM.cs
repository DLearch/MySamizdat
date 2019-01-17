using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.PasswordChange
{
    public class PasswordChangeVM
    {
        [Required]
        public string Name { get; set; }

        [Required(ErrorMessage = "current-password-input-error-empty")]
        [RegularExpression(@"(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$", ErrorMessage = "current-password-input-error-wrong")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "new-password-input-error-empty")]
        [RegularExpression(@"(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$", ErrorMessage = "new-password-input-error-wrong")]
        public string NewPassword { get; set; }
    }
}
