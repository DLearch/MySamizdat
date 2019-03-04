using Server.Models.Comments;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Books
{
    public class Book
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public string CoverPath { get; set; }

        //public int AuthorId { get; set; }
        //public Author Author { get; set; }

        //public List<BookGenre> Genres { get; set; }

        //[InverseProperty("OriginalBook")]
        //public List<TranslateBook> Translates { get; set; }

        public List<Bookmark> Bookmarks { get; set; }

        //[Required]
        //public int StateId { get; set; }
        //public BookState State { get; set; }
        //public string StateComment { get; set; }
        
        public List<Chapter> Chapters { get; set; }
        public List<BookComment> Comments { get; set; }
        
        public string LanguageId { get; set; }
        public Language Language { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public int? TeamId { get; set; }
        public Team Team { get; set; }

        public Book()
        {
            Bookmarks = new List<Bookmark>();
        }
    }
}
