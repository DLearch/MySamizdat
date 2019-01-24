using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Validators
{
    public class MyRequiredAttribute : RequiredAttribute
    {
        public override string FormatErrorMessage(string name)
        {
            return "empty";
        }
    }
}
