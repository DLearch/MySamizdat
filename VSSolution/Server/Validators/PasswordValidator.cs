using Microsoft.AspNetCore.Identity;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Server.Validators
{
    public class PasswordValidator : IPasswordValidator<User>
    {
        public const string code = "Password";
        public const string regexPattern = @"(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$";

        public Task<IdentityResult> ValidateAsync(UserManager<User> manager, User user, string password)
        {
            List<IdentityError> errors = new List<IdentityError>();

            if (string.IsNullOrEmpty(password))
                AddError("password-input-error-empty", errors);
            else if (!Regex.IsMatch(password, regexPattern))
                AddError("password-input-error-wrong", errors);

            return Task.FromResult(errors.Count == 0 ?
                IdentityResult.Success : IdentityResult.Failed(errors.ToArray()));
        }

        private void AddError(string error, List<IdentityError> errors)
        {
            errors.Add(new IdentityError
            {
                Code = code
                , Description = error
            });
        }
    }
}
