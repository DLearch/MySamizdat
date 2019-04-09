using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.UserController
{
    public class ChangeAvatarVM
    {
        public IFormFile Avatar { get; set; }
    }
}
