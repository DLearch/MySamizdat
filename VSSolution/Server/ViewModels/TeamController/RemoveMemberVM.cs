using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.TeamController
{
    public class RemoveMemberVM
    {
        [RequiredVM, UserNameVM]
        public string TeamName { get; set; }
        [RequiredVM, UserNameVM]
        public string UserName { get; set; }
    }
}
