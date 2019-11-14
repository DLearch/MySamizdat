using Server.Assets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Server.Attributes.ValidationAttributes
{
    public class NameAttribute : RequiredAttribute
    {
        public override string FormatErrorMessage(string name)
        {
            return ApiError.Wrong.ToString();
        }

        public override bool IsValid(object value)
        {
            if (value is null)
                return true;

            if (value is string name)
            {
                if (string.IsNullOrEmpty(name))
                    return true;

                Regex regex = new Regex(@"^$|^[a-zA-Z0-9_]{3,}$");

                return regex.IsMatch(name);
            }

            return false;
        }
    }
}
