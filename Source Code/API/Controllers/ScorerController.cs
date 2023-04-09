using Microsoft.AspNetCore.Mvc;

using API.Exceptions;
using API.Models;
using API.Models.DTOs;
using API.Models.Entities;
using API.Models.Responses;
using API.Services.Interfaces;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class ScorerController : ControllerBase
    {
        private readonly IScorerService _scorerService;

        public ScorerController(IScorerService scorerService)
        {
            _scorerService = scorerService;
        }

        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, "Scorers", typeof(Scorer[]))]
        public IActionResult GetScorers()
        {
            return Ok(_scorerService.GetScorers());
        }

        [HttpGet]
        [Route("{id}")]
        [SwaggerResponse(StatusCodes.Status200OK, "Scorer", typeof(Scorer))]
        [SwaggerResponse(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetScorerById([FromRoute] int id)
        {
            try
            {
                return Ok(await _scorerService.GetScorerByIdAsync(id));
            }
            catch (NotFound e)
            {
                return NotFound(new GenericResponse() { Message = e.Message });
            }
        }

        [HttpPatch]
        [Route("{id}")]
        [SwaggerResponse(StatusCodes.Status200OK)]
        [SwaggerResponse(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateScorer([FromRoute] int id, [FromBody] ScorerDTO scorer)
        {
            try
            {
                await _scorerService.UpdateScorerAsync(id, scorer.Username);
                return Ok();
            }
            catch (NotFound e)
            {
                return NotFound(new GenericResponse() { Message = e.Message });
            }
        }

        [HttpPost]
        [SwaggerResponse(StatusCodes.Status200OK, "ScorerID", typeof(int))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateScorer([FromBody] ScorerDTO scorer)
        {
            try
            {
                return Ok(await _scorerService.CreateScorerAsync(scorer.Username));
            }
            catch (NotFound e)
            {
                return NotFound(new GenericResponse() { Message = e.Message });
            }
        }

    }
}
