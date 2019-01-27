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
            services.AddTransient<IPasswordValidator<User>, PasswordValidator>();
            services.AddTransient<IUserValidator<User>, UserValidator>();

            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();
        }
    }
}
