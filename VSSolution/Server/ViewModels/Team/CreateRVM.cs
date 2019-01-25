using Server.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Team
{
    public class CreateRVM
    {
        [MyRequired]
        public Models.Team Team { get; set; }
    }
}
