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

        private readonly DrawingContext _drawingContext;
        private readonly EventContext _eventContext;
        private readonly IDrawingService _drawingService;

        public DrawingController(IDrawingService drawingService, DrawingContext drawingContext, EventContext eventContext)
        {
            _drawingContext = drawingContext;
            _eventContext = eventContext;
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
            Event? ev = _eventContext.GetEvent(drawing.EventID);
            if (ev == null) return new StatusCodeResult(StatusCodes.Status404NotFound);

            Drawing d = new Drawing() {
                Created = drawing.Created,
                CreatorAge = drawing.CreatorAge,
                Event = ev,
                // TODO
                FileGUID = "",
                FileExt = Path.GetExtension(image.FileName).Substring(1),
            };

            return new StatusCodeResult(_drawingContext.CreateDrawing(d).ToStatus());
        }

        [HttpGet]
        public async Task<IActionResult> GetDrawingByName([FromQuery] string fileName)
        {

            try
            {
                DrawingStream drawing = await _drawingService.GetDrawingByName(fileName);
                return new FileStreamResult(drawing.Stream, drawing.ContentType);
            }
            catch (Exception e)
            {
                if (e is DrawingNotFound)
                {
                    return NotFound(e.Message);
                } else
                {
                    return StatusCode(500, e.Message);
                }
            }
            
        }

        [HttpPut]
        public IActionResult Put([FromQuery] int id, [FromBody] NewDrawing drawing)
        {
            return new StatusCodeResult(_drawingContext.UpdateDrawing(id, drawing).ToStatus());
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] int id)
        {
            return new StatusCodeResult(_drawingContext.DeleteDrawing(id).ToStatus());
        }
    }
}