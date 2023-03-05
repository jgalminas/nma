using Microsoft.EntityFrameworkCore;
using API.Models.Entities;
using API.Services.Interfaces;
using API.Contexts;
using API.Exceptions;
using API.Models.DTOs;

namespace API.Services.Implementations
{
    public class LocationService : ILocationService
    {
        private readonly ApplicationDbContext _db;

        public LocationService(ApplicationDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// Get all locations
        /// </summary>
        /// <returns> An array of location object </returns>
        public async Task<Location[]> GetLocationsAsync()
        {
            return await _db.Locations.ToArrayAsync();
        }
    }
}