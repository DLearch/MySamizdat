using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Extensions.ModelStateDictionaryExtensions
{
    public static partial class ModelStateDictionaryExtensions
    {
        public static void AddModelErrors(this ModelStateDictionary source, ValidationResult validationResult, bool unique = true)
        {
            if (source == null)
                throw new ArgumentNullException("source");

            if (validationResult == null)
                throw new ArgumentNullException("validationResult");

            foreach (var memberName in validationResult.MemberNames)
                if (unique)
                    source.AddUniqueModelError(memberName, validationResult.ErrorMessage);
                else
                    source.AddModelError(memberName, validationResult.ErrorMessage);
        }
    }
}
