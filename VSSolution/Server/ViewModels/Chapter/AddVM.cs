using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Chapter
{
    public class AddVM
    {
        [RequiredVM]
        public string Name { get; set; }

        public string Content { get; set; }

        [RequiredVM]
        public int BookId { get; set; }
        
        public int? Index { get; set; }
    }
}
