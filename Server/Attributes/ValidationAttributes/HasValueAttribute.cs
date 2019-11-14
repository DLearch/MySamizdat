using Server.Assets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Attributes.ValidationAttributes
{
    public class HasValueAttribute : RequiredAttribute
    {
        public override string FormatErrorMessage(string name)
        {
            return ApiError.Empty.ToString();
        }
    }
}
