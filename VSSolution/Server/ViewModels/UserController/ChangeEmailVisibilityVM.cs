using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.UserController
{
    public class ChangeEmailVisibilityVM
    {
        [RequiredVM]
        public bool Visible { get; set; }
    }
}
