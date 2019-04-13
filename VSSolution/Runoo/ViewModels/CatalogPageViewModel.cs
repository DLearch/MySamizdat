using Runoo.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.ViewModels
{
    public class CatalogPageViewModel
    {
        [Required]
        public int Page { get; set; }

        [Required]
        public int PageSize { get; set; }

        public List<FilterViewModel> Filters { get; set; }
    }
}
