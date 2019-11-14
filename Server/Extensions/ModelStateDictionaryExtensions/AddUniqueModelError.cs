using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Extensions.ModelStateDictionaryExtensions
{
    public static partial class ModelStateDictionaryExtensions
    {
        public static void AddUniqueModelError(this ModelStateDictionary source, string key, string errorMessage)
        {
            if (source == null)
                throw new ArgumentNullException("source");

            if (source[key] != null)
                foreach (var modelError in source[key].Errors)
                    if (modelError.ErrorMessage == errorMessage)
                        return;

            source.AddModelError(key, errorMessage);
        }
    }
}
