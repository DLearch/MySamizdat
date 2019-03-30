using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.TeamController
{
    public class GetTeamVM
    {
        [RequiredVM]
        public string TeamName { get; set; }
    }
}
