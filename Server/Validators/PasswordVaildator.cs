﻿using Microsoft.AspNetCore.Identity;
using Server.Attributes.ValidationAttributes;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Validators
{
    public class PasswordVaildator : IPasswordValidator<User>
    {
        public const string code = "Password";

        public Task<IdentityResult> ValidateAsync(UserManager<User> manager, User user, string password)
        {
            List<IdentityError> errors = new List<IdentityError>();

            if (string.IsNullOrEmpty(password))
                AddError("empty", errors);
            else if (!(new PasswordAttribute().IsValid(password)))
                AddError("wrong", errors);

            return Task.FromResult(errors.Count == 0 ?
                IdentityResult.Success : IdentityResult.Failed(errors.ToArray()));
        }

        private void AddError(string error, List<IdentityError> errors)
        {
            errors.Add(new IdentityError
            {
                Code = code
                ,
                Description = error
            });
        }
    }
}
