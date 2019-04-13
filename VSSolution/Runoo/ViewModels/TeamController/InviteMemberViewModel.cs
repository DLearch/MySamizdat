using Runoo.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.ViewModels.TeamController
{
    public class InviteMemberViewModel
    {
        [Required, Name]
        public string UserName { get; set; }
    }
}
