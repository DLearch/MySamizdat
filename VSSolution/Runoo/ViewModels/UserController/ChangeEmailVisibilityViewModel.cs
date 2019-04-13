using Runoo.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.ViewModels.UserController
{
    public class ChangeEmailVisibilityViewModel
    {
        [Required]
        public bool Visible { get; set; }
    }
}
