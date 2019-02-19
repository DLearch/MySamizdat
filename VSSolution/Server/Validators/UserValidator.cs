using Microsoft.AspNetCore.Identity;
using Server.Models;
using Server.Validators.ViewModel;
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

            await ValidateUserNameAsync(manager, user, errors);

            await ValidateEmailAsync(manager, user, errors);

            return errors.Count == 0 ?
                IdentityResult.Success : IdentityResult.Failed(errors.ToArray());
        }

        private async Task ValidateUserNameAsync(UserManager<User> manager, User user, List<IdentityError> errors)
        {
            if (string.IsNullOrEmpty(user.UserName))
                AddError(userNameCode, "empty", errors);
            else if (!(new UserNameVMAttribute().IsValid(user.UserName)))
                AddError(userNameCode, "wrong", errors);
            else
            {
                User result = await manager.FindByNameAsync(user.UserName);

                if (result != null && result.Id != user.Id)
                    AddError(userNameCode, "already-taken", errors);
            }
        }

        private async Task ValidateEmailAsync(UserManager<User> manager, User user, List<IdentityError> errors)
        {
            if (string.IsNullOrEmpty(user.Email))
                AddError(emailCode, "empty", errors);
            else if (!(new EmailAddressAttribute().IsValid(user.Email)))
                AddError(emailCode, "wrong", errors);
            else
            {
                User result = await manager.FindByEmailAsync(user.Email);

                if (result != null && result.Id != user.Id)
                    AddError(emailCode, "already-taken", errors);
            }
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
