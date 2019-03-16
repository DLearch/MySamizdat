using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.ChapterController
{
    public class AddChapterVM
    {
        [RequiredVM]
        public string Name { get; set; }
        
        [RequiredVM]
        public int BookId { get; set; }
    }
}
