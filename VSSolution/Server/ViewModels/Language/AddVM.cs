﻿using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.Language
{
    public class AddVM
    {
        [RequiredVM]
        public string LanguageTK { get; set; }
    }
}