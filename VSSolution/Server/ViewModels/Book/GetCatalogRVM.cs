using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Book
{
    public class GetCatalogRVM
    {
        public int Length { get; set; }

        public List<Models.Book> Books { get; set; }
    }
}
