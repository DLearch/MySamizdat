using Server.Models.Comments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Chapter
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Content { get; set; }
        
        public DateTime CreationTime { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; }

        public List<ChapterComment> Comments { get; set; }
    }
}
