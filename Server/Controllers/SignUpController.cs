using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Assets;
using Server.Extensions.ModelStateDictionaryExtensions;
using Server.Models;
using Server.Services.EmailSenders;
using Server.ViewModels.SignUp;
using System;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : Controller
    {
        private UserManager<User> UserManager { get; set; }
        private SignInManager<User> SignInManager { get; set; }
        private ISignUpMessageSender SignUpMessageSender { get; set; }

        public SignUpController(UserManager<User> userManager,
                                SignInManager<User> signInManager,
                                ISignUpMessageSender signUpMessageSender)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            SignUpMessageSender = signUpMessageSender;
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody]SignUpPostViewModel model)
        {
            User user = new User()
            {
                UserName = model.UserName,
                Email = model.Email,
                CreationTime = DateTime.Now
            };

            IdentityResult result = await UserManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await SignUpMessageSender.SendAsync(user);

                return Ok();
            }
            else
            {
                ModelState.AddModelErrors(result);

                return BadRequest(ModelState);
            }
        }


        [HttpPost("SendEmailMessage")]
        public async Task<IActionResult> SendEmailMessageAsync([FromBody] SignUpSendEmailMessageViewModel model)
        {
            User user = await UserManager.FindByEmailAsync(model.Email);

            if (user is null)
                ModelState.AddModelError("Email", ApiError.NotFound);
            else if (user.EmailConfirmed)
                ModelState.AddModelError("Email", ApiError.AlreadyCompleted);
            else
            {
                await SignUpMessageSender.SendAsync(user);

                return Ok();
            }

            return BadRequest(ModelState);
        }

        [HttpGet]
        public async Task<IActionResult> CompleteWithEmailAsync([FromQuery]SignUpCompleteWithEmailViewModel model)
        {
            User user = await UserManager.FindByEmailAsync(model.Email);

            if (user == null)
                ModelState.AddModelError("Email", ApiError.NotFound);
            else if (user.EmailConfirmed)
                ModelState.AddModelError("Email", ApiError.AlreadyCompleted);
            else
            {
                IdentityResult result = await UserManager.ConfirmEmailAsync(user, model.Token);

                if (result.Succeeded)
                {
                    await SignInManager.SignInAsync(user, false);

                    return Redirect("/email-confirmed");
                }
                else
                    ModelState.AddModelErrors(result);
            }

            return BadRequest(ModelState);
        }
    }
}
