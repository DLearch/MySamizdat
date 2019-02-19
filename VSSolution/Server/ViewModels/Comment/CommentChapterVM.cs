using Server.Validators;
using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Comment
{
    public class CommentChapterVM
    {
        [RequiredVM]
        public string Content { get; set; }

        [RequiredVM]
        public int ChapterId { get; set; }

        public int ParentId { get; set; }
    }
}
