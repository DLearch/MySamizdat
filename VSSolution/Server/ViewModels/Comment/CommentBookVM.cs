using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Comment
{
    public class CommentBookVM
    {
        [RequiredVM]
        public string Content { get; set; }

        [RequiredVM]
        public int BookId { get; set; }

        public int ParentId { get; set; }
    }
}
