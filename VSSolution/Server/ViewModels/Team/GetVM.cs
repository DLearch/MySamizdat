using Server.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Team
{
    public class GetVM
    {
        [MyRequired]
        public int TeamId { get; set; }
    }
}
