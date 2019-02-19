using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Book
{
    public class GetCatalogVM
    {
        [RequiredVM]
        public int PageSize { get; set; }

        [RequiredVM]
        public int Page { get; set; }
    }
}
