using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Server.Validators
{
    public class PasswordAttribute : ValidationAttribute
    {
        public override string FormatErrorMessage(string name)
        {
            return "wrong";
        }
        
        public override bool IsValid(object value)
        {
            if (value is string)
            {
                string password = value as string;
                Regex regex = new Regex(@"^$|^[a-zA-Z0-9_\-@]{6,}$");
            
                return regex.IsMatch(password);
            }

            return false;
        }
    }
}
