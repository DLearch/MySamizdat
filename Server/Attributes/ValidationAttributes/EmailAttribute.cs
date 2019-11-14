using Server.Assets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Attributes.ValidationAttributes
{
    public class EmailAttribute : ValidationAttribute
    {
        public override string FormatErrorMessage(string name)
        {
            return ApiError.Wrong.ToString();
        }

        public override bool IsValid(object value)
        {
            return new EmailAddressAttribute().IsValid(value);
        }
    }
}
