using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Auth
{
    public class ConfirmEmailVM
    {
        [RequiredVM]
        [EmailVM]
        public string Email { get; set; }

        [RequiredVM]
        public string Token { get; set; }
    }
}
