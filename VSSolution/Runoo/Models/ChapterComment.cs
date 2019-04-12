using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Models
{
    public class ChapterComment : Comment
    {
        [Required]
        public int ChapterId { get; set; }
        public Chapter Chapter { get; set; }
    }
}
