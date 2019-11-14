using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Server.Services.EmailSenders
{
    public class SignUpMessageSender : ISignUpMessageSender
    {
        public string Name => Configuration["Email:Name"];
        public string Address => Configuration["Email:Address"];
        private IConfiguration Configuration { get; set; }
        private UserManager<User> UserManager { get; set; }
        private IEmailSender EmailSender { get; set; }

        public SignUpMessageSender(
            IConfiguration configuration,
            UserManager<User> userManager,
            IEmailSender emailSender
        )
        {
            Configuration = configuration;
            UserManager = userManager;
            EmailSender = emailSender;
        }

        public void Send(User addressee)
        {
            throw new NotImplementedException();
        }

        public async Task SendAsync(User addressee)
        {
            string token = HttpUtility.UrlEncode(await UserManager.GenerateEmailConfirmationTokenAsync(addressee));
            string callbackUrl = $"https://localhost:44351/api/signup/completewithemail?email={addressee.Email}&token={token}";

            var message = new MimeMessage()
            {
                Subject = "Завершение регистрации",
                Body = new TextPart(TextFormat.Html)
                {
                    Text = $"Подтвердите email и завершите регистрацию, перейдя по <a href='{callbackUrl}'>ссылке</a>"
                }
            };

            message.From.Add(new MailboxAddress(Name, Address));
            message.To.Add(new MailboxAddress(string.Empty, addressee.Email));

            await EmailSender.SendAsync(message);
        }
    }
}
