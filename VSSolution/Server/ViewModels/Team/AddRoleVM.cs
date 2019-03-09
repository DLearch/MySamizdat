using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Team
{
    public class AddRoleVM
    {
        [RequiredVM]
        public string RoleTK { get; set; }

        [RequiredVM]
        public string UserName { get; set; }
    }
}
