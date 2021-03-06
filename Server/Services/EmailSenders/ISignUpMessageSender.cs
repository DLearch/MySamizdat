﻿using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services.EmailSenders
{
    public interface ISignUpMessageSender
    {
        void Send(User addressee);

        Task SendAsync(User addressee);
    }
}
