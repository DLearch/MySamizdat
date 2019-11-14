using MailKit;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services.EmailSenders
{
    public class EmailSender : IEmailSender
    {
        public string Host => Configuration["Email:Host"];
        public int Port => int.Parse(Configuration["Email:Port"]);
        public bool UseSSL => bool.Parse(Configuration["Email:UseSSL"]);
        public string Address => Configuration["Email:Address"];
        public string Password => Configuration["Email:Password"];

        private IConfiguration Configuration { get; set; }
        private IMailTransport MailTransport { get; set; }

        public EmailSender(
            IConfiguration configuration,
            IMailTransport mailTransport
        )
        {
            Configuration = configuration;
            MailTransport = mailTransport;
        }

        public void Send(MimeMessage message)
        {
            MailTransport.Connect(Host, Port, UseSSL);
            MailTransport.Authenticate(Address, Password);
            MailTransport.Send(message);
            MailTransport.Disconnect(true);
        }

        public async Task SendAsync(MimeMessage message)
        {
            await MailTransport.ConnectAsync(Host, Port, UseSSL);
            await MailTransport.AuthenticateAsync(Address, Password);
            await MailTransport.SendAsync(message);
            await MailTransport.DisconnectAsync(true);
        }
    }
}
