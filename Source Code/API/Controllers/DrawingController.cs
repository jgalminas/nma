using API.Exceptions;
using API.Models.DTOs;
using API.Models.Responses;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

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

        /// <summary>
        /// Upload a drawing file with associated metadata.
        /// </summary>
        [HttpPost]
        [SwaggerResponse(StatusCodes.Status200OK, "TrailID", typeof(int))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UploadDrawing([FromForm] NewDrawingDTO data)
        {

            try
            {
                var drawingId = await _drawingService.UploadDrawingAsync(data);
                // TODO: this should be 201 not 200!
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
                return StatusCode(StatusCodes.Status500InternalServerError, new GenericResponse()
                {
                    Message = e.Message
                });
            }

        }

        /// <summary>
        /// Get drawing metadata and file URL by ID.
        /// </summary>
        [HttpGet]
        [Route("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK, "DrawingDTO", typeof(DrawingDTO))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
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

        /// <summary>
        /// Get a drawing image file by file ID.
        /// </summary>
        [HttpGet]
        [Route("Image/{fileId}")]
        [SwaggerResponse(StatusCodes.Status200OK, "FileStreamResult", typeof(FileStreamResult))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status404NotFound)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
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
                return StatusCode(StatusCodes.Status500InternalServerError, new GenericResponse()
                {
                    Message = e.Message
                });
            }
        }

        /// <summary>
        /// Modify a drawing metadata with a given ID.
        /// </summary>
        [HttpPatch]
        [Route("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK)]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
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

        /// <summary>
        /// Delete a drawing with a given ID.
        /// </summary>
        [HttpDelete]
        [Route("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK)]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status404NotFound)]
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
                return StatusCode(StatusCodes.Status500InternalServerError, new GenericResponse()
                {
                    Message = e.Message
                });
            }
        }
    }
}