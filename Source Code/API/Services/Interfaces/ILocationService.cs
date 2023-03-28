using API.Models.DTOs;
using API.Models.Entities;

namespace API.Services.Interfaces
{
    public interface ILocationService
    {
        Task<Location> GetLocationByIdAsync(int id);
        Task<Location[]> GetLocationsAsync(int page, int count);
        Task<int> CreateLocationAsync(LocationDTO data);
        Task UpdateLocationAsync(int id, LocationDTO data);
        Task DeleteLocationAsync(int id);
        Task<int> GetLocationCountAsync();
        Task<LocationIdNameDTO[]> GetLocationListAsync();
    }
}
