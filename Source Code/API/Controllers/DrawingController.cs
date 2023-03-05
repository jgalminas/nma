using API.Exceptions;
using API.Models.DTOs;
using API.Models.Responses;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("Api/[Controller]")]
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
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse()
                {
                    Message = e.Message
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, new GenericResponse()
                {
                    Message = e.Message
                });
            }

        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetDrawing(int id)
        {
            try
            {
                var drawing = await _drawingService.GetDrawingByIdAsync(id);
                return Ok(drawing);
            }
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse()
                {
                    Message = e.Message
                });
            }
        }

        [HttpGet]
        [Route("Image/{fileId}")]
        public async Task<IActionResult> GetImage(string fileId)
        {

            try
            {
                DrawingStreamDTO drawing = await _drawingService.GetDrawingByIdAsync(fileId);
                return new FileStreamResult(drawing.Stream, drawing.ContentType);
            }
            catch (NotFound e)
            {
                return NotFound(new GenericResponse()
                {
                    Message = e.Message
                });
            }
            catch (BadRequest e)
            {
                return BadRequest(new GenericResponse()
                {
                    Message = e.Message
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, new GenericResponse()
                {
                    Message = e.Message
                });
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
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteDrawing(int id)
        {
            try
            {
                await _drawingService.DeleteDrawingAsync(id);
                return Ok();
            }
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse()
                {
                    Message = e.Message
                });
            } 
            catch (Exception e)
            {
                return StatusCode(500, new GenericResponse()
                {
                    Message = e.Message
                });
            }
        }
    }
}