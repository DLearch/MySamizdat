using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Server.Controllers;
using Server.Models;
using Server.Services.EmailSenders;
using Server.ViewModels.SignUp;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Server.Tests.Controllers.SignUp
{
    public class SignUpControllerSendEmailMessageTests
    {
        [Fact]
        public async Task SendSignUpMessageAsync_ShouldReturnBadRequest_WithModelState_WhenUserIsNotFound()
        {
            var signUpMessageSenderMock = new Mock<ISignUpMessageSender>();
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);

            using (var controller = new SignUpController(userManagerMock.Object, null, signUpMessageSenderMock.Object))
            {
                IActionResult actionResult = await controller.SendEmailMessageAsync(new SignUpSendEmailMessageViewModel());

                var badRequestObjectResult = Assert.IsType<BadRequestObjectResult>(actionResult);
                Assert.IsType<SerializableError>(badRequestObjectResult.Value);
            }
        }
        [Fact]
        public async Task SendSignUpMessageAsync_ShouldReturnBadRequest_WithModelState_WhenEmailAlreadyConfirmed()
        {
            var signUpMessageSenderMock = new Mock<ISignUpMessageSender>();
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            userManagerMock.Setup(m => m.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(new User { EmailConfirmed = true });

            using (var controller = new SignUpController(userManagerMock.Object, null, signUpMessageSenderMock.Object))
            {
                IActionResult actionResult = await controller.SendEmailMessageAsync(new SignUpSendEmailMessageViewModel());

                var badRequestObjectResult = Assert.IsType<BadRequestObjectResult>(actionResult);
                Assert.IsType<SerializableError>(badRequestObjectResult.Value);
            }
        }
        [Fact]
        public async Task SendSignUpMessageAsync_ShouldSend_AndReturnOk()
        {
            var signUpMessageSenderMock = new Mock<ISignUpMessageSender>();
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            userManagerMock.Setup(m => m.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(new User());

            using (var controller = new SignUpController(userManagerMock.Object, null, signUpMessageSenderMock.Object))
            {
                IActionResult actionResult = await controller.SendEmailMessageAsync(new SignUpSendEmailMessageViewModel());

                signUpMessageSenderMock.Verify(m => m.SendAsync(It.IsAny<User>()));
                Assert.IsType<OkResult>(actionResult);
            }
        }
    }
}
