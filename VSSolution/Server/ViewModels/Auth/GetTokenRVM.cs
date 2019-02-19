using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Auth
{
    public class GetTokenRVM
    {
        [RequiredVM]
        [UserNameVM]
        public string UserName { get; set; }

        [RequiredVM]
        public string Token { get; set; }
    }
}
