using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Server.Validators
{
    public class MyEmailAddressAttribute : ValidationAttribute
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
