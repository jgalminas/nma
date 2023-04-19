using API.Exceptions;
using API.Models;
using API.Models.DTOs;
using API.Models.Entities;
using API.Models.Responses;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ScoreController : ControllerBase
    {
        private readonly IScoreService _scoreService;

        public ScoreController(IScoreService scoreService)
        {
            _scoreService = scoreService;
        }

        /// <summary>
        /// Create a Score object in the database.
        /// </summary>
        [HttpPost]
        [SwaggerResponse(StatusCodes.Status200OK, "ScoreID", typeof(int))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateScore([FromBody] ScoreNewDTO data)
        {
            try
            {
                return Ok(new IdResponse()
                {
                    Id = await _scoreService.CreateScoreAsync(data),
                    Message = "OK",
                });
            }
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse() { Message = e.Message });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new GenericResponse() { Message = e.Message });
            }
        }

        /// <summary>
        /// Get all Score objects in the database.
        /// </summary>
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, "Scores", typeof(Score[]))]
        public async Task<IActionResult> GetScores([FromQuery] int page = 0, [FromQuery] int count = 10)
        {
            return Ok(await _scoreService.GetScoresAsync(page, count));
        }

        /// <summary>
        /// Get a Score object by ID.
        /// </summary>
        [HttpGet]
        [Route("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK, "Score", typeof(Score))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetScore(int id)
        {
            try
            {
                return Ok(await _scoreService.GetScoreByIdAsync(id));
            }
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse() { Message = e.Message });
            }
        }

        /// <summary>
        /// Update a Score object in the database by ID.
        /// </summary>
        [HttpPatch]
        [Route("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK)]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateScore(int id, [FromBody] ScoreNewDTO data)
        {
            try
            {
                await _scoreService.UpdateScoreAsync(id, data);
                return Ok();
            }
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse() { Message = e.Message });
            }
        }

        /// <summary>
        /// Delete a Score object in the database by ID.
        /// </summary>        
        [HttpDelete]
        [Route("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK)]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteScore(int id)
        {
            try
            {
                await _scoreService.DeleteScoreAsync(id);
                return Ok();
            }
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse() { Message = e.Message });
            }
            catch (Exception e)
            {
                return StatusCode(500, new GenericResponse() { Message = e.Message });
            }
        }

        [HttpGet]
        [Route("Count")]
        public async Task<IActionResult> GetScoreCountAsync()
        {
            try
            {
                var count = await _scoreService.GetScoreCountAsync();
                return Ok(new CountDTO() { Count = count });

            }
            catch (Exception e)
            {
                return StatusCode(500, new GenericResponse() { Message = e.Message });
            }
        }
    }
}