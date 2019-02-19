using Microsoft.AspNetCore.Http;
using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Book
{
    public class AddVM
    {
        [RequiredVM]
        public string Title { get; set; }
        public IFormFile MainImage { get; set; }
    }
}
