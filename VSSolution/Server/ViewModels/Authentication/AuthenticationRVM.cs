﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Authentication
{
    public class AuthenticationRVM
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Token { get; set; }
    }
}