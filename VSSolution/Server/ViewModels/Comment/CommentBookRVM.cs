using Server.Models;
using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Comment
{
    public class CommentBookRVM
    {
        [RequiredVM]
        public int CommentId { get; set; }

        [RequiredVM]
        public DateTime CreationTime { get; set; }

        [RequiredVM]
        public User Author { get; set; }
    }
}
