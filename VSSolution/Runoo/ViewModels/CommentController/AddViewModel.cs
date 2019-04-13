using Runoo.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.ViewModels.CommentController
{
    public class AddViewModel
    {
        [Required]
        public string Content { get; set; }

        [Required]
        public int EntityId { get; set; }

        [Required]
        public string EntityType { get; set; }

        public int ParentId { get; set; }
    }
}
