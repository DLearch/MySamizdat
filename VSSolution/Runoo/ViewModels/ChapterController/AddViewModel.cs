using Runoo.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.ViewModels.ChapterController
{
    public class AddViewModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int BookId { get; set; }
    }
}
