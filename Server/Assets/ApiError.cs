using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Assets
{
    public enum ApiError
    {
        Wrong,
        NotFound,
        AlreadyCompleted,
        AlreadyTaken,
        Empty,
        NotCompleted
    }
}
