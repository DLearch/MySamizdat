using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.BookmarkController
{
    public class RemoveBookmarkVM
    {
        [RequiredVM]
        public int BookId { get; set; }
    }
}
