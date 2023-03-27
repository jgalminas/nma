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
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        /// <summary>
        /// Create a Location object in the database.
        /// </summary>
        [HttpPost]
        [SwaggerResponse(StatusCodes.Status200OK, "LocationID", typeof(int))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
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
                return StatusCode(StatusCodes.Status500InternalServerError, new GenericResponse() { Message = e.Message });
            }
        }

        /// <summary>
        /// Get all Location objects in the database.
        /// </summary>
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, "Locations", typeof(Location[]))]
        public async Task<IActionResult> GetLocations()
        {
            return Ok(await _locationService.GetLocationsAsync());
        }

        /// <summary>
        /// Get a Location object by ID.
        /// </summary>
        [HttpGet]
        [Route("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK, "Location", typeof(Location))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
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

        /// <summary>
        /// Update a Location object in the database by ID.
        /// </summary>
        [HttpPatch]
        [Route("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK)]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
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

        /// <summary>
        /// Delete a Location object in the database by ID.
        /// </summary>        
        [HttpDelete]
        [Route("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK)]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
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
        [Route("Count")]
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

        [HttpGet]
        [Route("List")]
        public async Task<IActionResult> GetLocationListAsync()
        {
            try
            {
                return Ok(await _locationService.GetLocationListAsync());
            }
            catch (Exception e)
            {
                return StatusCode(500, new GenericResponse() { Message = e.Message });
            }
        }
    }
}