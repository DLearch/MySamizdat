using Microsoft.AspNetCore.Mvc;
using Server.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;

namespace Server.ViewModels.Team
{
    public class GetRVM : Controller
    {
        [MyRequired]
        public Models.Team Team { get; set; }
    }
}
