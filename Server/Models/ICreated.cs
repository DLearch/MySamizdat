using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public interface ICreated
    {
        [Required]
        DateTime CreationTime { get; set; }
    }
}
