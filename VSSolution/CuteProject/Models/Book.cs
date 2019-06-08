using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CuteProject.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }
        
        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public string CoverPath { get; set; }
    }
}
