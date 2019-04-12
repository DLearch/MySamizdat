using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Runoo.Attributes
{
    public class NameAttribute : ValidationAttribute
    {
        public override string FormatErrorMessage(string name)
        {
            return "wrong";
        }

        public override bool IsValid(object value)
        {
            if (value is string)
            {
                string userName = value as string;
                Regex regex = new Regex(@"^$|^[a-zA-Z0-9_]{3,}$");

                return regex.IsMatch(userName);
            }

            return false;
        }
    }
}
