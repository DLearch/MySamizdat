﻿using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.ChapterController
{
    public class UpdateVM
    {
        [RequiredVM]
        public string Name { get; set; }

        public string Content { get; set; }
    }
}
