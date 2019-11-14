using Server.Assets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Server.Attributes.ValidationAttributes
{
    public class PasswordAttribute : ValidationAttribute
    {
        public override string FormatErrorMessage(string name)
        {
            return ApiError.Wrong.ToString();
        }

        public override bool IsValid(object value)
        {
            if (value is null)
                return true;

            if (value is string password)
            {
                if (string.IsNullOrEmpty(password))
                    return true;

                Regex regex = new Regex(@"^$|^[a-zA-Z0-9_\-@]{6,}$");

                return regex.IsMatch(password);
            }

            return false;
        }
    }
}
