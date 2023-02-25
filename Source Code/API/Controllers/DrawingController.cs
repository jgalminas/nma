using API.Exceptions;
using API.Models.DTOs;
using API.Models.Responses;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DrawingController : ControllerBase
    {

        private readonly IDrawingService _drawingService;

        public DrawingController(IDrawingService drawingService)
        {
            _drawingService = drawingService;
        }

        [HttpPost]
        public async Task<IActionResult> UploadDrawing([FromForm] NewDrawingDTO data)
        {

            try
            {
                var drawingId = await _drawingService.UploadDrawingAsync(data);
                return Ok(new IdResponse()
                {
                    Id = drawingId,
                    Message = "OK"
                });
            }
            catch (Exception e)
            {
                if (e is NotFound)
                {
                    return BadRequest(new GenericResponse()
                    {
                        Message = e.Message
                    });
                } else
                {
                    return StatusCode(500, new GenericResponse()
                    {
                        Message = e.Message
                    });
                }
            }

        }

        [HttpGet]
        public async Task<IActionResult> GetDrawingById([FromQuery] string fileId)
        {

            try
            {
                DrawingStreamDTO drawing = await _drawingService.GetDrawingByIdAsync(fileId);
                return new FileStreamResult(drawing.Stream, drawing.ContentType);
            }
            catch (Exception e)
            {
                if (e is NotFound)
                {
                    return NotFound(new GenericResponse()
                    {
                        Message = e.Message
                    });
                }
                else if (e is BadRequest)
                {
                    return BadRequest(new GenericResponse()
                    {
                        Message = e.Message
                    });
                }
                else
                {
                    return StatusCode(500, new GenericResponse()
                    {
                        Message = e.Message
                    });
                }
            }
            
        }

        [HttpPatch]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateDrawing(int id, [FromBody] DrawingUpdateDTO data)
        {
            try
            {
                await _drawingService.UpdateDrawingAsync(id, data);
                return Ok();
            }
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse()
                {
                    Message = e.Message
                });
            }

        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] int id)
        {
            return Ok();
/*            return new StatusCodeResult(_drawingContext.DeleteDrawing(id).ToStatus());
*/        }
    }
}