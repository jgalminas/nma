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
    public class TopicController : ControllerBase
    {
        private readonly ITopicService _topicService;

        public TopicController(ITopicService topicService)
        {
            _topicService = topicService;
        }

        /// <summary>
        /// Get all Topic objects in the database.
        /// </summary>
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, "Topics", typeof(Topic[]))]
        public async Task<IActionResult> GetTopics([FromQuery] int page = 0, [FromQuery] int count = 10)
        {
            return Ok(await _topicService.GetTopicsAsync(page, count));
        }
    }
}