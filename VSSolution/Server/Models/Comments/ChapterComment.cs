using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Comments
{
    public class ChapterComment : Comment
    {
        public int ChapterId { get; set; }
        public Chapter Chapter { get; set; }
    }
}
