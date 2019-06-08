using Runoo.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.ViewModels.UserController
{
    public class SendEmailViewModel
    {
        [Required, Email]
        public string SenderEmail { get; set; }
        [Required]
        public string Message { get; set; }
    }
}
