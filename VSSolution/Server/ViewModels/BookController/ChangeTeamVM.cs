using Server.Validators.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels.BookController
{
    public class ChangeTeamVM
    {
        [RequiredVM]
        public int BookId { get; set; }
        [RequiredVM, UserNameVM]
        public string TeamName { get; set; }
    }
}
