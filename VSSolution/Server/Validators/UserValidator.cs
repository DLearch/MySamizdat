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

        public async Task<IdentityResult> ValidateAsync(UserManager<User> manager, User user)
        {
            List<IdentityError> errors = new List<IdentityError>();

            if (string.IsNullOrEmpty(user.UserName))
                AddError(userNameCode, "empty", errors);
            else if (!(new UserNameAttribute().IsValid(user.UserName)))
                AddError(userNameCode, "wrong", errors);
            else if ((await manager.FindByNameAsync(user.UserName)) != null)
                AddError(userNameCode, "already-taken", errors);

            if (string.IsNullOrEmpty(user.Email))
                AddError(emailCode, "empty", errors);
            else if (!(new EmailAddressAttribute().IsValid(user.Email)))
                AddError(emailCode, "wrong", errors);
            else if ((await manager.FindByEmailAsync(user.Email)) != null)
                AddError(emailCode, "already-taken", errors);

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
