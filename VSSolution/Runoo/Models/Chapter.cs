using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Models
{
    public class Chapter
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int Index { get; set; }

        [Required]
        public string Name { get; set; }

        public string Content { get; set; }

        [Required]
        public int BookId { get; set; }
        public Book Book { get; set; }

        [Required]
        public string ChapterStateTK { get; set; }
        public ChapterState ChapterState { get; set; }
        [Required]
        public DateTime LastStateChangeTime { get; set; }

        public List<ChapterComment> Comments { get; set; }
        
    }
}
