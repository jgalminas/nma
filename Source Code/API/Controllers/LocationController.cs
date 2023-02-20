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

        private readonly LocationContext _context;

        public LocationController(LocationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.GetLocations()) { StatusCode = StatusCodes.Status200OK };
        }
    }
}