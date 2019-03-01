﻿using Server.Models.Books;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Language
    {
        [Key]
        public string Id { get; set; }

        //public List<User> Users { get; set; }

        public List<Book> Books { get; set; }
        //public List<TranslateBook> TranslateBooks { get; set; }
    }
}
