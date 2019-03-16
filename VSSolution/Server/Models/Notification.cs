using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Notification
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        [Required]
        public bool IsChecked { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        public string Discriminator { get; set; }
    }
}
