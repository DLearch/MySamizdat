using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Book
{
    public class GetCatalogRVM
    {
        [RequiredVM]
        public int Length { get; set; }

        public List<Models.Books.Book> Books { get; set; }
    }
}
