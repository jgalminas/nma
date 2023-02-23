using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class LocationController : ControllerBase
    {
        // TODO: Swagger annotations


        public LocationController()
        {
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
/*            return new JsonResult(_context.GetLocations()) { StatusCode = StatusCodes.Status200OK };
*/        }
    }
}