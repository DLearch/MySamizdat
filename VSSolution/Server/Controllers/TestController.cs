using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    public class TestController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return Content("Ok get");
        }

        [HttpPost]
        public IActionResult Index(string message)
        {
            return Content("Ok post " + message + "!");
        }
    }
}
