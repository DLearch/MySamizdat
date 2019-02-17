using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Book
{
    public class AddVM
    {
        public string Title { get; set; }
        public IFormFile MainImage { get; set; }
    }
}
