using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Bookmark
{
    public class AddVM
    {
        [RequiredVM]
        public int BookId { get; set; }
    }
}
