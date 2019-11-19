using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Server.Controllers;
using Server.Models;
using Server.ViewModels.SignIn;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Server.Tests.Controllers.SignIn
{
    public class SignInControllerPostTests
    {
        [Fact]
        public async Task PostAsync_ShouldReturnBadRequest_WithModelState_WhenUserIsNotFound()
        {
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);

            using (var controller = new SignInController(userManagerMock.Object, null))
            {
                IActionResult actionResult = await controller.PostAsync(new SignInPostViewModel());

                var badRequestObjectResult = Assert.IsType<BadRequestObjectResult>(actionResult);
                Assert.IsType<SerializableError>(badRequestObjectResult.Value);
            }
        }

        [Fact]
        public async Task PostAsync_ShouldReturnBadRequest_WithModelState_WhenEmailIsNotConfirmed()
        {
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            userManagerMock.Setup(m => m.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(new User { EmailConfirmed = false });

            using (var controller = new SignInController(userManagerMock.Object, null))
            {
                IActionResult actionResult = await controller.PostAsync(new SignInPostViewModel());

                var badRequestObjectResult = Assert.IsType<BadRequestObjectResult>(actionResult);
                Assert.IsType<SerializableError>(badRequestObjectResult.Value);
            }
        }

        [Fact]
        public async Task PostAsync_ShouldSignIn_AndReturnOk()
        {
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            var signInManagerMock = new Mock<SignInManager<User>>(userManagerMock.Object,
                                                                  new Mock<IHttpContextAccessor>().Object,
                                                                  new Mock<IUserClaimsPrincipalFactory<User>>().Object,
                                                                  new Mock<IOptions<IdentityOptions>>().Object,
                                                                  new Mock<ILogger<SignInManager<User>>>().Object,
                                                                  new Mock<IAuthenticationSchemeProvider>().Object,
                                                                  new Mock<IUserConfirmation<User>>().Object);
            userManagerMock
                .Setup(m => m.FindByEmailAsync(It.IsAny<string>()))
                .ReturnsAsync(new User { EmailConfirmed = true });
            signInManagerMock
                .Setup(m => m.PasswordSignInAsync(It.IsAny<User>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>()))
                .ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.Success);

            using (var controller = new SignInController(userManagerMock.Object, signInManagerMock.Object))
            {
                IActionResult actionResult = await controller.PostAsync(new SignInPostViewModel());

                Assert.IsType<OkResult>(actionResult);
                signInManagerMock.Verify(m => m.PasswordSignInAsync(It.IsAny<User>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>()));
            }
        }

        [Fact]
        public async Task PostAsync_ShouldReturnBadRequest_WithModelState_WhenSignInFailed()
        {
            var userStoreMock = new Mock<IUserStore<User>>();
            var userManagerMock = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            var signInManagerMock = new Mock<SignInManager<User>>(userManagerMock.Object,
                                                                  new Mock<IHttpContextAccessor>().Object,
                                                                  new Mock<IUserClaimsPrincipalFactory<User>>().Object,
                                                                  new Mock<IOptions<IdentityOptions>>().Object,
                                                                  new Mock<ILogger<SignInManager<User>>>().Object,
                                                                  new Mock<IAuthenticationSchemeProvider>().Object,
                                                                  new Mock<IUserConfirmation<User>>().Object);
            userManagerMock
                .Setup(m => m.FindByEmailAsync(It.IsAny<string>()))
                .ReturnsAsync(new User { EmailConfirmed = true });
            signInManagerMock
                .Setup(m => m.PasswordSignInAsync(It.IsAny<User>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>()))
                .ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.Failed);

            using (var controller = new SignInController(userManagerMock.Object, signInManagerMock.Object))
            {
                IActionResult actionResult = await controller.PostAsync(new SignInPostViewModel());

                var badRequestObjectResult = Assert.IsType<BadRequestObjectResult>(actionResult);
                Assert.IsType<SerializableError>(badRequestObjectResult.Value);
            }
        }
    }
}
