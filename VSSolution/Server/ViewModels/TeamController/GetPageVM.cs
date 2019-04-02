﻿using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.TeamController
{
    public class GetPageVM
    {
        [RequiredVM]
        public int Page { get; set; }

        [RequiredVM]
        public int PageSize { get; set; }

        [RequiredVM]
        [UserNameVM]
        public string UserName { get; set; }

        public List<CatalogFilter> Filters { get; set; }
    }
}
