using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.BookController
{
    public class GetTeamBooksVM
    {
        [RequiredVM]
        public int Page { get; set; }

        [RequiredVM]
        public int PageSize { get; set; }

        [RequiredVM, UserNameVM]
        public string TeamName { get; set; }

        public List<CatalogFilter> Filters { get; set; }
    }
}
