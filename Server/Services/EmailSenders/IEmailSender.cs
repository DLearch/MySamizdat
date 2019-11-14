using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services.EmailSenders
{
    public interface IEmailSender
    {
        void Send(MimeMessage message);

        Task SendAsync(MimeMessage message);
    }
}
