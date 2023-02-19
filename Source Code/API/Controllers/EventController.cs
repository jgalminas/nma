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

        private readonly EventContext _context;

        public EventController(EventContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Event ev)
        {
            return new StatusCodeResult(_context.CreateEvent(ev).ToStatus());
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.GetEvents()) { StatusCode = StatusCodes.Status200OK };
        }

        [HttpGet]
        public IActionResult Get([FromQuery] int id)
        {
            if (_context.GetEvent(id) is Event ev)
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
            return new StatusCodeResult(_context.UpdateEvent(ev).ToStatus());
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] int id)
        {
            return new StatusCodeResult(_context.DeleteEvent(id).ToStatus());
        }
    }
}