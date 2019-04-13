using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Models
{
    public class Author
    {
        [Key]
        [Required]
        public string Name { get; set; }

        public List<Book> Books { get; set; }
    }
}
