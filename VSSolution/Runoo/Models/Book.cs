using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Models
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

        [Required]
        public string LanguageTK { get; set; }
        public Language Language { get; set; }

        public string AuthorName { get; set; }
        public Author Author { get; set; }
        
        [Required]
        public string BookStateTK { get; set; }
        public BookState BookState { get; set; }
        public string BookStateComment { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        public List<BookComment> Comments { get; set; }

        public List<Bookmark> Bookmarks { get; set; }

        public List<Chapter> Chapters { get; set; }
        
        public string TeamName { get; set; }
        public Team Team { get; set; }

        public string Discriminator { get; set; }
    }
}
