using Server.Models.Books;
using Server.Models.Comments;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Chapter
    {
        public int Id { get; set; }

        [Required]
        public int Index { get; set; }

        [Required]
        public string Name { get; set; }

        public string Content { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; }

        public List<ChapterComment> Comments { get; set; }
    }
}
