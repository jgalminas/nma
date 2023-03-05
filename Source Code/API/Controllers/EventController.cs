using API.Exceptions;
using API.Models.DTOs;
using API.Models.Entities;
using API.Models.Responses;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromForm] NewEventDTO data)
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
                return BadRequest(new GenericResponse() { Message = e.Message } );
            }
            catch (Exception e)
            {
                return StatusCode(500, new GenericResponse() { Message = e.Message } );
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            return Ok(await _eventService.GetEventsAsync());
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetEvent(int id)
        {
            try
            {
                return Ok(await _eventService.GetEventByIdAsync(id));
            }
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse() { Message = e.Message } );
            }
        }

        [HttpPatch]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromForm] EventUpdateDTO data)
        {
            try
            {
                await _eventService.UpdateEventAsync(id, data);
                return Ok();
            }
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse() { Message = e.Message } );
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            try
            {
                await _eventService.DeleteEventAsync(id);
                return Ok();
            }
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse() { Message = e.Message } );
            }
            catch (Exception e)
            {
                return StatusCode(500, new GenericResponse() { Message = e.Message } );
            }
        }
    }
}