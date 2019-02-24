using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Book
{
    public class GetVM
    {
        [RequiredVM]
        public int BookId { get; set; }
    }
}
