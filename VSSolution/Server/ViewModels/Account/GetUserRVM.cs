using Server.Models;
using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Account
{
    public class GetUserRVM
    {
        [RequiredVM]
        public User User { get; set; }
    }
}
