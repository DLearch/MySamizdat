using Server.Models;
using Server.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Book
{
    public class CommentVM
    {
        [MyRequired]
        public string Content { get; set; }
        
        [MyRequired]
        public int BookId { get; set; }

        public int ParentId { get; set; }
    }
}
