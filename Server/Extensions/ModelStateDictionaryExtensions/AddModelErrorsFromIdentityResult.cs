using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Extensions.ModelStateDictionaryExtensions
{
    public static partial class ModelStateDictionaryExtensions
    {
        public static void AddModelErrors(this ModelStateDictionary source, IdentityResult identityResult, bool unique = true)
        {
            if (source == null)
                throw new ArgumentNullException("source");

            if (identityResult == null)
                throw new ArgumentNullException("identityResult");

            foreach (var error in identityResult.Errors)
            {
                if (unique)
                    source.AddUniqueModelError(error.Code, error.Description);
                else
                    source.AddModelError(error.Code, error.Description);
            }
        }
    }
}
