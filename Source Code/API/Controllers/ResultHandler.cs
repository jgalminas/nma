using API.Models;

namespace API.Controllers
{
    static class ResultHandler
    {
        public static int ToStatus(this CreateResult result)
        {
            return result == CreateResult.Ok ? StatusCodes.Status200OK : StatusCodes.Status409Conflict;
        }

        public static int ToStatus(this UpdateDeleteResult result)
        {
            return result == UpdateDeleteResult.Ok ? StatusCodes.Status200OK : StatusCodes.Status404NotFound;
        }
    }

}