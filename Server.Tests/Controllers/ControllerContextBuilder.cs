using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Server.Tests.Controllers
{
    public class ControllerContextBuilder
    {
        public ControllerContext ControllerContext { get; private set; }
        private ClaimsIdentity ClaimsIdentity { get; set; }
        public ControllerContextBuilder()
        {
            Reset();
        }

        public void Reset()
        {
            ClaimsIdentity = new ClaimsIdentity();
            var claimsPrincipal = new ClaimsPrincipal(ClaimsIdentity);
            ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = claimsPrincipal }
            };
        }

        public void AddClaim(Claim claim)
        {
            ClaimsIdentity.AddClaim(claim);
        }
    }
}
