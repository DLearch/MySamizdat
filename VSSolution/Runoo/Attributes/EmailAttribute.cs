using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Runoo.Attributes
{
    public class EmailAttribute : ValidationAttribute
    {
        public override string FormatErrorMessage(string name)
        {
            return "wrong";
        }

        public override bool IsValid(object value)
        {
            return new EmailAddressAttribute().IsValid(value);
        }
    }
}
