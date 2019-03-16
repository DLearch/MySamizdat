using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Genre
    {
        [Key]
        [Required]
        public string TK { get; set; }

        public List<BookGenre> BookGenres { get; set; }
    }
}
