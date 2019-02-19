using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Validators.ViewModel
{
    public class EmailVMAttribute : ValidationAttribute
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
