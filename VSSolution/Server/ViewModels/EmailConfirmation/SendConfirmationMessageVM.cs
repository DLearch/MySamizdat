using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.EmailConfirmation
{
    public class SendConfirmationMessageVM
    {
        [Required(ErrorMessage = "empty")]
        [EmailAddress(ErrorMessage = "wrong")]
        public string Email { get; set; }
    }
}
