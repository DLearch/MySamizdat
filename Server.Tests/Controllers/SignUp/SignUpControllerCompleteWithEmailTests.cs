using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
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
    public class SignUpControllerCompleteWithEmailTests
    {
        [Fact]
        public async Task CompleteWithEmailAsync_ShouldReturnBadRequest_WithModelState_WhenUserIsNotFound()
        {
            var signUpMessageSenderMock = new Mock<ISignUpMessageSender>();
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);

            using (var controller = new SignUpController(userManagerMock.Object, null, signUpMessageSenderMock.Object))
            {
                IActionResult actionResult = await controller.CompleteWithEmailAsync(new SignUpCompleteWithEmailViewModel());

                var badRequestObjectResult = Assert.IsType<BadRequestObjectResult>(actionResult);
                Assert.IsType<SerializableError>(badRequestObjectResult.Value);
            }
        }

        [Fact]
        public async Task CompleteWithEmailAsync_ShouldReturnBadRequest_WithModelState_WhenEmailAlreadyConfirmed()
        {
            var signUpMessageSenderMock = new Mock<ISignUpMessageSender>();
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            userManagerMock.Setup(m => m.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(new User { EmailConfirmed = true });

            using (var controller = new SignUpController(userManagerMock.Object, null, signUpMessageSenderMock.Object))
            {
                IActionResult actionResult = await controller.CompleteWithEmailAsync(new SignUpCompleteWithEmailViewModel());

                var badRequestObjectResult = Assert.IsType<BadRequestObjectResult>(actionResult);
                Assert.IsType<SerializableError>(badRequestObjectResult.Value);
            }
        }
        [Fact]
        public async Task CompleteWithEmailAsync_ShouldReturnBadRequest_WithModelState_WhenEmailIsNotConfirmed()
        {
            var signUpMessageSenderMock = new Mock<ISignUpMessageSender>();
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            userManagerMock.Setup(m => m.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(new User());
            userManagerMock.Setup(m => m.ConfirmEmailAsync(It.IsAny<User>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Failed());

            using (var controller = new SignUpController(userManagerMock.Object, null, signUpMessageSenderMock.Object))
            {
                IActionResult actionResult = await controller.CompleteWithEmailAsync(new SignUpCompleteWithEmailViewModel());

                var badRequestObjectResult = Assert.IsType<BadRequestObjectResult>(actionResult);
                Assert.IsType<SerializableError>(badRequestObjectResult.Value);
            }
        }

        [Fact]
        public async Task CompleteWithEmailAsync_ShouldConfirmEmail_AndSignIn_AndRedirect()
        {
            var signUpMessageSenderMock = new Mock<ISignUpMessageSender>();
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            var signInManagerMock = new Mock<SignInManager<User>>(userManagerMock.Object,
                                                                  new Mock<IHttpContextAccessor>().Object,
                                                                  new Mock<IUserClaimsPrincipalFactory<User>>().Object,
                                                                  new Mock<IOptions<IdentityOptions>>().Object,
                                                                  new Mock<ILogger<SignInManager<User>>>().Object,
                                                                  new Mock<IAuthenticationSchemeProvider>().Object,
                                                                  new Mock<IUserConfirmation<User>>().Object);
            userManagerMock.Setup(m => m.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(new User());
            userManagerMock.Setup(m => m.ConfirmEmailAsync(It.IsAny<User>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success);

            using (var controller = new SignUpController(userManagerMock.Object, signInManagerMock.Object, signUpMessageSenderMock.Object))
            {
                IActionResult actionResult = await controller.CompleteWithEmailAsync(new SignUpCompleteWithEmailViewModel());

                userManagerMock.Verify(m => m.ConfirmEmailAsync(It.IsAny<User>(), It.IsAny<string>()));
                signInManagerMock.Verify(m => m.SignInAsync(It.IsAny<User>(), It.IsAny<bool>(), It.IsAny<string>()));
                Assert.IsType<RedirectResult>(actionResult);
            }
        }
    }
}
