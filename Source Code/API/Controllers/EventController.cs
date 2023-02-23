using API.Contexts;
using API.Models;
using API.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class EventController : ControllerBase
    {
        // TODO: Swagger annotations

        private readonly ApplicationDbContext _db;

        public EventController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Event ev)
        {
            return Ok(ev);
/*            return new StatusCodeResult(_context.CreateEvent(ev).ToStatus());
*/        }


        // cant have two paths with the same name
/*        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.GetEvents()) { StatusCode = StatusCodes.Status200OK };
        }*/

        [HttpGet]
        public IActionResult Get([FromQuery] int id)
        {
            //db test
            var res = _db.Topics.Where(t => t.TopicName == "test").ToArray();

            return Ok(res);
/*            if (_context.GetEvent(id) is Event ev)
            {
                return new JsonResult(ev) { StatusCode = StatusCodes.Status200OK };
            }
            else
            {
                return new StatusCodeResult(StatusCodes.Status404NotFound);
            }*/
        }

        [HttpPut]
        public IActionResult Put([FromBody] Event ev)
        {
            return Ok();
/*            return new StatusCodeResult(_context.UpdateEvent(ev).ToStatus());
*/        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] int id)
        {
            return Ok();
/*            return new StatusCodeResult(_context.DeleteEvent(id).ToStatus());
*/        }
    }
}