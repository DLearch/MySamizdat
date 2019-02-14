﻿using Server.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Account
{
    public class ConfirmEmailVM
    {
        [MyRequired]
        [MyEmailAddress]
        public string Email { get; set; }

        [MyRequired]
        public string Token { get; set; }
    }
}