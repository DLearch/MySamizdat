using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Comment
{
    public class CommentBookRVM
    {
        public int CommentId { get; set; }

        public DateTime CreationTime { get; set; }

        public User Author { get; set; }
    }
}
