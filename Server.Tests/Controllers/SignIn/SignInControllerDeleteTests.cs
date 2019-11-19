using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Server.Controllers;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Server.Tests.Controllers.SignIn
{
    public class SignInControllerDeleteTests
    {
        [Fact]
        public async Task DeleteAsync_ShouldSignOut_AndReturnOk()
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

            using (var controller = new SignInController(userManagerMock.Object, signInManagerMock.Object))
            {
                IActionResult actionResult = await controller.DeleteAsync();

                Assert.IsType<OkResult>(actionResult);
                signInManagerMock.Verify(m => m.SignOutAsync());
            }
        }
    }
}
