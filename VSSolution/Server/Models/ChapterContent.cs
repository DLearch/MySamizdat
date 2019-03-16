using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class ChapterContent
    {
        [Key]
        public string Id { get; set; }

        public string Content { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        [Required]
        public int ChapterId { get; set; }
        public Chapter Chapter { get; set; }
    }
}
