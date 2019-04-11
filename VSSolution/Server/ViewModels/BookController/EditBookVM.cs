using Server.Models;
using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.BookController
{
    public class EditBookVM
    {
        [RequiredVM]
        public int BookId { get; set; }
        
        [RequiredVM]
        public Book Book { get; set; }
    }
}
