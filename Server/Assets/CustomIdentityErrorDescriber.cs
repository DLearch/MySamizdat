using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Assets
{
    public class CustomIdentityErrorDescriber : IdentityErrorDescriber
    {
        const string passwordKey = "Password";
        const string userNameKey = "UserName";
        const string emailKey = "Email";
        const string tokenKey = "Token";

        public override IdentityError PasswordMismatch() =>
            new IdentityError { Code = passwordKey, Description = ApiError.Wrong.ToString() };

        public override IdentityError InvalidUserName(string userName) =>
            new IdentityError { Code = userNameKey, Description = ApiError.Wrong.ToString() };

        public override IdentityError InvalidEmail(string email) =>
            new IdentityError { Code = emailKey, Description = ApiError.Wrong.ToString() };

        public override IdentityError DuplicateUserName(string userName) =>
            new IdentityError { Code = userNameKey, Description = ApiError.AlreadyTaken.ToString() };

        public override IdentityError DuplicateEmail(string email) =>
            new IdentityError { Code = emailKey, Description = ApiError.AlreadyTaken.ToString() };

        public override IdentityError PasswordTooShort(int length) =>
            new IdentityError { Code = passwordKey, Description = ApiError.Wrong.ToString() };

        public override IdentityError PasswordRequiresNonAlphanumeric() =>
            new IdentityError { Code = passwordKey, Description = ApiError.Wrong.ToString() };

        public override IdentityError PasswordRequiresDigit() =>
            new IdentityError { Code = passwordKey, Description = ApiError.Wrong.ToString() };

        public override IdentityError PasswordRequiresLower() =>
            new IdentityError { Code = passwordKey, Description = ApiError.Wrong.ToString() };

        public override IdentityError PasswordRequiresUpper() =>
            new IdentityError { Code = passwordKey, Description = ApiError.Wrong.ToString() };

        public override IdentityError InvalidToken() =>
            new IdentityError { Code = tokenKey, Description = ApiError.Wrong.ToString() };
    }
}
