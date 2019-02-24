using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Comments
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        [Required]
        public string Content { get; set; }

        public string AuthorId { get; set; }
        public User Author { get; set; }

        public string Discriminator { get; set; }

        public int? ParentId { get; set; }
        public Comment Parent { get; set; }

        [InverseProperty("Parent")]
        public List<Comment> Children { get; set; }
    }
}
