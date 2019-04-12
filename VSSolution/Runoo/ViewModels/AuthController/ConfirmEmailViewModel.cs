using Runoo.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.ViewModels.AuthController
{
    public class ConfirmEmailViewModel
    {
        [Required, Email]
        public string Email { get; set; }

        [Required]
        public string Token { get; set; }
    }
}
