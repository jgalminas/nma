using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class EventController : ControllerBase
    {
        // TODO: Swagger annotations
        // TODO: Abstract out Context->StatusCode logic

        private readonly EventContext _context;

        public EventController(EventContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Event ev)
        {
            int code = _context.AddEvent(ev) ? StatusCodes.Status201Created : StatusCodes.Status409Conflict;
            return new StatusCodeResult(code);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.GetEvents()) { StatusCode = StatusCodes.Status200OK }; 
        }

        [HttpGet]
        public IActionResult Get([FromQuery] string name)
        {
            if (_context.GetEvent(name) is Event ev)
            {
                return new JsonResult(ev) { StatusCode = StatusCodes.Status200OK }; 
            }
            else
            {
                return new StatusCodeResult(StatusCodes.Status404NotFound);
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] Event ev)
        {
            int code = _context.UpdateEvent(ev) ? StatusCodes.Status200OK : StatusCodes.Status404NotFound;
            return new StatusCodeResult(code);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] string name)
        {
            int code = _context.DeleteEvent(name) ? StatusCodes.Status200OK : StatusCodes.Status404NotFound;
            return new StatusCodeResult(code);
        }
    }
}