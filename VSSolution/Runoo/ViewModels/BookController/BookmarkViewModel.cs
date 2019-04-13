using Runoo.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.ViewModels.BookController
{
    public class BookmarkViewModel
    {
        [Required]
        public bool Bookmarked { get; set; }
    }
}
