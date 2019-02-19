﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Language
    {
        public int Id { get; set; }

        public string TK { get; set; }

        public List<User> Users { get; set; }

        public List<Book> Books { get; set; }
    }
}
