using Runoo.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.ViewModels.ChapterController
{
    public class UpdateViewModel
    {
        [Required]
        public string Name { get; set; }

        public string Content { get; set; }
    }
}
