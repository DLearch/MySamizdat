using Microsoft.AspNetCore.Mvc.ModelBinding;
using Server.Assets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Extensions.ModelStateDictionaryExtensions
{
    public static partial class ModelStateDictionaryExtensions
    {
        public static void AddModelError(this ModelStateDictionary source, string key, ApiError error, bool unique = true)
        {
            if (source == null)
                throw new ArgumentNullException("source");

            if (unique)
                source.AddUniqueModelError(key, error.ToString());
            else
                source.AddModelError(key, error.ToString());
        }
    }
}
