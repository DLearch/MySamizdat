using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Notification
{
    public class Notification
    {
        public int Id { get; set; }
        
        public bool IsChecked { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public DateTime CreationTime { get; set; }

        public string Discriminator { get; set; }
    }
}
