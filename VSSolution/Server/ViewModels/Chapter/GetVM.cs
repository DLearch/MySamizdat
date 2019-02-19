using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Chapter
{
    public class GetVM
    {
        [RequiredVM]
        public int ChapterId { get; set; }
    }
}
