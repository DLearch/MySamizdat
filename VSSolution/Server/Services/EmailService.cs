using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MimeKit;
using Server.Models;
using Server.ViewModels.EmailConfirmation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Server.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;

        public EmailService(
            IConfiguration configuration
            , UserManager<User> userManager
        )
        {
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task SendMessageAsync(string email, string subject, string message)
        {
            MimeMessage emailMessage = new MimeMessage()
            {
                Subject = subject,
                Body = new TextPart(MimeKit.Text.TextFormat.Html)
                {
                    Text = message
                }
            };

            emailMessage.From.Add(new MailboxAddress(_configuration["Email:Name"], _configuration["Email:Address"]));
            emailMessage.To.Add(new MailboxAddress("", email));

            using (SmtpClient client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 25, false);

                await client.AuthenticateAsync(_configuration["Email:Address"], _configuration["Email:Password"]);
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }

        public async Task SendEmailConfirmationMessageAsync(User user)
        {
            string token = HttpUtility.UrlEncode(await _userManager.GenerateEmailConfirmationTokenAsync(user));
            string callbackUrl = $"https://localhost:44314/confirm-email?email={user.Email}&token={token}";

            await SendMessageAsync(
                user.Email
                , "Confirm your account"
                , $"Подтвердите регистрацию, перейдя по <a href='{callbackUrl}'>ссылке</a>"
            );
        }
    }
}
