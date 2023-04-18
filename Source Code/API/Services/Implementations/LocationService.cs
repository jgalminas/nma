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
        /// Get location by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns> A location object </returns>
        /// <exception cref="NotFound"></exception>
        public async Task<Location> GetLocationByIdAsync(int id)
        {
            if (await _db.Locations.FindAsync(id) is Location loc)
            {
                return loc;
            }
            else
            {
                throw new NotFound($"Location with id {id} doesn't exist");
            }
        }

        /// <summary>
        /// Get all locations
        /// </summary>
        /// <returns> An array of location object </returns>
        public async Task<Location[]> GetLocationsAsync(int page, int count)
        {
            return await _db.Locations
                            .Where(l => !l.IsDeleted)
                            .Skip(page * count)
                            .Take(count)
                            .ToArrayAsync();
        }

        /// <summary>
        /// Get the count of locations in the database
        /// </summary>
        /// <returns> numer of locations </returns>
        public async Task<int> GetLocationCountAsync()
        {
            return await _db.Locations.Where(l => !l.IsDeleted).CountAsync();
        }

        /// <summary>
        /// Add a location to the database
        /// </summary>
        /// <param name="data"></param>
        /// <returns> A location id </returns>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        public async Task<int> CreateLocationAsync(LocationDTO data)
        {
            var loc = new Location()
            {
                Country = data.Country,
                City = data.City,
                LocationName = data.LocationName,
            };

            try
            {
                await _db.Locations.AddAsync(loc);
                await _db.SaveChangesAsync();

                return loc.LocationId;
            }
            catch (DbUpdateException)
            {
                throw new ServerError("Couldn't save drawing data to the database");
            }
        }

        /// <summary>
        /// Modify a location object in the database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="data"></param>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        public async Task UpdateLocationAsync(int id, LocationDTO data)
        {
            if (await _db.Locations.FindAsync(id) is Location loc)
            {
                loc.Country = data.Country;
                loc.City = data.City;
                loc.LocationName = data.LocationName;

                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    throw new ServerError();
                }
            }
            else
            {
                throw new NotFound($"Location with id {id} doesn't exist");
            }
        }

        /// <summary>
        /// Delete a location object from the database
        /// </summary>
        /// <param name="id"></param>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        public async Task DeleteLocationAsync(int id)
        {
            if (await _db.Locations.FindAsync(id) is Location loc)
            {
                loc.IsDeleted = true;

                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    throw new ServerError();
                }
            }
            else
            {
                throw new NotFound($"Location with id {id} doesn't exist");
            }
        }

        public Task<IdNameDTO[]> GetLocationListAsync()
        {
            return _db.Locations
                .Where(l => !l.IsDeleted)
                .Select(l => new IdNameDTO()
                {
                    Id = l.LocationId,
                    Name = l.LocationName
                }).ToArrayAsync();
        }
    }
}