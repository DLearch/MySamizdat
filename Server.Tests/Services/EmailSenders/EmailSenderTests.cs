using MailKit;
using Microsoft.Extensions.Configuration;
using MimeKit;
using Moq;
using Server.Services.EmailSenders;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Server.Tests.Services.EmailSenders
{
    public class EmailSenderTests
    {
        public Mock<IConfiguration> ConfigMock
        {
            get
            {
                var configMock = new Mock<IConfiguration>();

                configMock.Setup(c => c["Email:Address"]).Returns("name@site.com");
                configMock.Setup(c => c["Email:Password"]).Returns("Pass");
                configMock.Setup(c => c["Email:Host"]).Returns("smtp.gmail.com");
                configMock.Setup(c => c["Email:Port"]).Returns("25");
                configMock.Setup(c => c["Email:UseSSL"]).Returns("true");

                return configMock;
            }
        }

        [Fact]
        public void Send_ShouldSend()
        {
            var message = new MimeMessage();
            var configMock = ConfigMock;
            var mailTransportMock = new Mock<IMailTransport>();

            var sender = new EmailSender(configMock.Object, mailTransportMock.Object);

            sender.Send(message);

            mailTransportMock.Verify(m => m.Send(It.IsAny<MimeMessage>(), default, default));
        }

        [Fact]
        public async Task SendAsync_ShouldSend()
        {
            var message = new MimeMessage();
            var configMock = ConfigMock;
            var mailTransportMock = new Mock<IMailTransport>();

            var sender = new EmailSender(configMock.Object, mailTransportMock.Object);

            await sender.SendAsync(message);

            mailTransportMock.Verify(m => m.SendAsync(It.IsAny<MimeMessage>(), default, default));
        }
    }
}
