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
        public static void AddModelErrors(this ModelStateDictionary source, IEnumerable<ValidationResult> validationResults, bool unique = true)
        {
            if (source == null)
                throw new ArgumentNullException("source");

            if (validationResults == null)
                throw new ArgumentNullException("validationResult");

            foreach (var validationResult in validationResults)
                source.AddModelErrors(validationResult, unique);
        }
    }
}
