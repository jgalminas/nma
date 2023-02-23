using API.Exceptions;
using API.Models;
using API.Models.Entities;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class DrawingController : ControllerBase
    {
        // TODO: Swagger annotations

        private readonly IDrawingService _drawingService;

        public DrawingController(IDrawingService drawingService)
        {
            _drawingService = drawingService;
        }

        public class NewDrawing
        {
            public DateTime Created { get; set; }

            public int CreatorAge { get; set; }

            public int EventID { get; set; }
        }

        [HttpPost]
        public IActionResult Post([FromForm] IFormFile image, [FromBody] NewDrawing drawing)
        {
/*            Event? ev = _eventContext.GetEvent(drawing.EventID);
            if (ev == null) return new StatusCodeResult(StatusCodes.Status404NotFound);

            Drawing d = new Drawing() {
                Created = drawing.Created,
                DrawersAge = drawing.CreatorAge,
                Event = ev,
                // TODO
                FileGUID = "",
                FileExt = Path.GetExtension(image.FileName).Substring(1),
            };*/

            return new StatusCodeResult(2);
        }

        [HttpGet]
        public async Task<IActionResult> GetDrawingById([FromQuery] string fileId)
        {

            try
            {
                DrawingStream drawing = await _drawingService.GetDrawingByIdAsync(fileId);
                return new FileStreamResult(drawing.Stream, drawing.ContentType);
            }
            catch (Exception e)
            {
                if (e is NotFound)
                {
                    return NotFound(e.Message);
                }
                else if (e is BadRequest)
                {
                    return BadRequest(e.Message);
                }
                else
                {
                    return StatusCode(500, e.Message);
                }
            }
            
        }

        [HttpPut]
        public IActionResult Put([FromQuery] int id, [FromBody] NewDrawing drawing)
        {
            return Ok();
/*            return new StatusCodeResult(_drawingContext.UpdateDrawing(id, drawing).ToStatus());
*/        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] int id)
        {
            return Ok();
/*            return new StatusCodeResult(_drawingContext.DeleteDrawing(id).ToStatus());
*/        }
    }
}