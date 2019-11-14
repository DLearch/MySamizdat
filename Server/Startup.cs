using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Server.Assets;
using Server.Models;
using Server.Services.EmailSenders;

namespace Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IHostingEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options =>
            {
                string connectionName = "Default";

                if (Environment.IsDevelopment())
                    connectionName = "Development";

                options.UseSqlServer(Configuration.GetConnectionString(connectionName));
            });

            services.AddIdentity<User, IdentityRole>(options => {
                options.User.RequireUniqueEmail = true;
                options.SignIn.RequireConfirmedEmail = true;
            })
                .AddEntityFrameworkStores<AppDbContext>()
                .AddErrorDescriber<CustomIdentityErrorDescriber>()
                .AddDefaultTokenProviders();

            services.ConfigureApplicationCookie(options => {
                options.LoginPath = "/sign-in";
                options.LogoutPath = "/sign-out";
            });

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            services.AddTransient<IMailTransport, SmtpClient>();
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<ISignUpMessageSender, SignUpMessageSender>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "api/{controller}/{action=Index}/{id?}");
            });
        }
    }
}
