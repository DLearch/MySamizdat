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
    public class SignUpControllerPostTests
    {
        [Fact]
        public async Task PostAsync_ShouldCreateUser_AndSendSignUpMessage_AndReturnOk()
        {
            var signUpMessageSenderMock = new Mock<ISignUpMessageSender>();
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            userManagerMock.Setup(m => m.CreateAsync(It.IsAny<User>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success);

            using (var controller = new SignUpController(userManagerMock.Object, null, signUpMessageSenderMock.Object))
            {
                IActionResult actionResult = await controller.PostAsync(new SignUpPostViewModel());

                Assert.IsType<OkResult>(actionResult);
                userManagerMock.Verify(m => m.CreateAsync(It.IsAny<User>(), It.IsAny<string>()));
                signUpMessageSenderMock.Verify(m => m.SendAsync(It.IsAny<User>()));
            }
        }

        [Fact]
        public async Task PostAsync_ShouldReturnBadRequest_WithModelState_WhenUserIsNotCreated()
        {
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            userManagerMock.Setup(m => m.CreateAsync(It.IsAny<User>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Failed());

            using (var controller = new SignUpController(userManagerMock.Object, null, null))
            {
                IActionResult actionResult = await controller.PostAsync(new SignUpPostViewModel());

                var badRequestObjectResult = Assert.IsType<BadRequestObjectResult>(actionResult);
                Assert.IsType<SerializableError>(badRequestObjectResult.Value);
            }
        }
    }
}
