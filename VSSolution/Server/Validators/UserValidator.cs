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
                AddError(userNameCode, "username-input-error-empty", errors);
            else if (!Regex.IsMatch(user.UserName, regexUserNamePattern))
                AddError(userNameCode, "username-input-error-wrong", errors);
            else if ((await manager.FindByNameAsync(user.UserName)) != null)
                AddError(userNameCode, "username-input-error-already-taken", errors);

            if (string.IsNullOrWhiteSpace(user.Email))
                AddError(emailCode, "email-input-error-empty", errors);
            else if (!(new EmailAddressAttribute().IsValid(user.Email)))
                AddError(emailCode, "email-input-error-wrong", errors);
            else if ((await manager.FindByEmailAsync(user.Email)) != null)
                AddError(emailCode, "email-input-error-already-taken", errors);

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
