using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Team
{
    public class RespondInvitationVM
    {
        [RequiredVM]
        public int InvitationId { get; set; }

        [RequiredVM]
        public bool Accept { get; set; }
    }
}
