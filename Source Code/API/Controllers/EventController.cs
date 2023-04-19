using API.Exceptions;
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
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        /// <summary>
        /// Create an event in the database.
        /// </summary>
        [HttpPost]
        [SwaggerResponse(StatusCodes.Status200OK, "EventID", typeof(int))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] EventNewDTO data)
        {
            try
            {
                return Ok(new IdResponse()
                {
                    Id = await _eventService.CreateEventAsync(data),
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
        /// Get all events in the database.
        /// </summary>
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, "Events", typeof(Event[]))]
        public async Task<IActionResult> GetEvents([FromQuery] int page = 0, [FromQuery] int count = 10)
        {
            return Ok(await _eventService.GetEventsAsync(page, count));
        }

        /// <summary>
        /// Get an event object by ID.
        /// </summary>
        [HttpGet]
        [Route("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK, "Event", typeof(Event))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetEvent(int id)
        {
            try
            {
                return Ok(await _eventService.GetEventByIdAsync(id));
            }
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse() { Message = e.Message });
            }
        }

        /// <summary>
        /// Update an event object in the database by ID.
        /// </summary>
        [HttpPatch]
        [Route("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK)]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] EventUpdateDTO data)
        {
            try
            {
                await _eventService.UpdateEventAsync(id, data);
                return Ok();
            }
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse() { Message = e.Message });
            }
        }

        /// <summary>
        /// Delete an event object in the database by ID.
        /// </summary>        
        [HttpDelete]
        [Route("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK)]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            try
            {
                await _eventService.DeleteEventAsync(id);
                return Ok();
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
        /// Get the total number of events
        /// </summary>
        [HttpGet]
        [Route("Count")]
        public async Task<IActionResult> GetEventCountAsync()
        {
            try
            {
                var count = await _eventService.GetEventCountAsync();
                return Ok(new CountDTO() { Count = count });

            }
            catch (Exception e)
            {
                return StatusCode(500, new GenericResponse() { Message = e.Message });
            }
        }

        [HttpGet]
        [Route("List")]
        public async Task<IActionResult> GetEventListAsync()
        {
            try
            {
                return Ok(await _eventService.GetEventListAsync());
            }
            catch (Exception e)
            {
                return StatusCode(500, new GenericResponse() { Message = e.Message });
            }
        }
    }
}