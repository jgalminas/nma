using API.Exceptions;
using API.Models;
using API.Models.DTOs;
using API.Models.Responses;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateLocation([FromForm] LocationDTO data)
        {
            try
            {
                return Ok(new IdResponse()
                {
                    Id = await _locationService.CreateLocationAsync(data),
                    Message = "OK",
                });
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
        public async Task<IActionResult> GetLocations()
        {
            return Ok(await _locationService.GetLocationsAsync());
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetLocation(int id)
        {
            try
            {
                return Ok(await _locationService.GetLocationByIdAsync(id));
            }
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse() { Message = e.Message });
            }
        }

        [HttpPatch]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateLocation(int id, [FromForm] LocationDTO data)
        {
            try
            {
                await _locationService.UpdateLocationAsync(id, data);
                return Ok();
            }
            catch (NotFound e)
            {
                return BadRequest(new GenericResponse() { Message = e.Message });
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            try
            {
                await _locationService.DeleteLocationAsync(id);
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
        [Route("count")]
        public async Task<IActionResult> GetLocationCountAsync()
        {
            try
            {
                var count = await _locationService.GetLocationCountAsync();
                return Ok(new CountDTO() { Count = count });

            }
            catch (Exception e)
            {
                return StatusCode(500, new GenericResponse() { Message = e.Message });
            }
        }

    }
}