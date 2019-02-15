using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Content { get; set; }

        public string AuthorId { get; set; }
        public User Author { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; }

        //public int ParentId { get; set; }
        //public Comment Parent { get; set; }
        //public List<Comment> Children { get; set; }
    }
}
