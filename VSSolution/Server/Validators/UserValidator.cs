using Microsoft.AspNetCore.Identity;
using Server.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Server.Validators
{
    public class UserValidator : IUserValidator<User>
    {
        public const string userNameCode = "UserName";
        public const string emailCode = "Email";

        public const string regexUserNamePattern = @"^[a-zA-Z0-9_]+$";

        public async Task<IdentityResult> ValidateAsync(UserManager<User> manager, User user)
        {
            List<IdentityError> errors = new List<IdentityError>();

            if (string.IsNullOrWhiteSpace(user.UserName))
                AddError(userNameCode, "inputs.username.errors.empty", errors);
            else if (!Regex.IsMatch(user.UserName, regexUserNamePattern))
                AddError(userNameCode, "inputs.username.errors.wrong", errors);
            else if ((await manager.FindByNameAsync(user.UserName)) != null)
                AddError(userNameCode, "inputs.username.errors.already-taken", errors);  // throws 400 error with username already taken

            if (string.IsNullOrWhiteSpace(user.Email))
                AddError(emailCode, "inputs.email.errors.empty", errors);
            else if (!(new EmailAddressAttribute().IsValid(user.Email)))
                AddError(emailCode, "inputs.email.errors.wrong", errors);
            else if ((await manager.FindByEmailAsync(user.Email)) != null)
                AddError(emailCode, "inputs.email.errors.already-taken", errors);  // throws 400 error with email already taken

            return errors.Count == 0 ?
                IdentityResult.Success : IdentityResult.Failed(errors.ToArray());
        }

        private void AddError(string code, string error, List<IdentityError> errors)
        {
            errors.Add(new IdentityError
            {
                Code = code
                , Description = error
            });
        }
    }
}
