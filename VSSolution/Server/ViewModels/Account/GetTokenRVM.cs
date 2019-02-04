using Server.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Account
{
    public class GetTokenRVM
    {
        [MyRequired]
        public string UserName { get; set; }

        [MyRequired]
        public string Token { get; set; }
    }
}
