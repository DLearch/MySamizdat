using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Server.Models;
using Server.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ServiceProviderExtensions
{
    public static class IdentityExtensions
    {
        public static void AddConfiguredIdentity(this IServiceCollection services)
        {
            //services.AddTransient<IPasswordValidator<User>, PasswordValidator>();
            //services.AddTransient<IUserValidator<User>, UserValidator>(); // throws 400 error with email & username already taken

            services.AddIdentity<User, IdentityRole>(options => {
                    options.Password.RequiredLength = 6;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireLowercase = true;
                    options.Password.RequireUppercase = true;
                    options.Password.RequireDigit = true;

                    options.User.RequireUniqueEmail = true;
                    options.User.AllowedUserNameCharacters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMM0123456789_";
                })
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();
        }
    }
}
