using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    public class TeamController : Controller
    {
        private readonly AppDbContext _db;

        public TeamController(
            AppDbContext db
        )
        {
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> GetTeam()
        {
            if (ModelState.IsValid)
            {

            }

            return BadRequest(ModelState);
        }
    }
}
