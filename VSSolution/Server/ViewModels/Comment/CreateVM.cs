using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Comment
{
    public class CreateVM
    {
        [RequiredVM]
        public string Content { get; set; }

        [RequiredVM]
        public int EntityId { get; set; }

        [RequiredVM]
        public string EntityType { get; set; }

        public int ParentId { get; set; }
    }
}
