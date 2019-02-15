using Server.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Comment
{
    public class CommentBookVM
    {
        [MyRequired]
        public string Content { get; set; }

        [MyRequired]
        public int BookId { get; set; }

        public int ParentId { get; set; }
    }
}
