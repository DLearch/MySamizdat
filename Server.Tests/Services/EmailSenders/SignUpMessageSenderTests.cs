using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MimeKit;
using Moq;
using Server.Models;
using Server.Services.EmailSenders;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Server.Tests.Services.EmailSenders
{
    public class SignUpMessageSenderTests
    {
        public Mock<IConfiguration> ConfigMock
        {
            get
            {
                var configMock = new Mock<IConfiguration>();

                configMock.Setup(c => c["Email:Name"]).Returns("Name");
                configMock.Setup(c => c["Email:Address"]).Returns("name@site.com");

                return configMock;
            }
        }

        [Fact]
        public async Task SendAsync_ShouldGenerateToken_AndSend()
        {
            var user = new User() { Email = "name@site.com" };
            var configMock = ConfigMock;
            var emailSenderMock = new Mock<IEmailSender>();
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            var signUpMessageSender = new SignUpMessageSender(configMock.Object, userManagerMock.Object, emailSenderMock.Object);

            await signUpMessageSender.SendAsync(user);

            userManagerMock.Verify(s => s.GenerateEmailConfirmationTokenAsync(user));
            emailSenderMock.Verify(m => m.SendAsync(It.IsAny<MimeMessage>()));
        }
    }
}
