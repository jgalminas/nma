using API.Models.Entities;

namespace API.Services.Interfaces
{
    public interface ILocationService
    {
        Task<Location[]> GetLocationsAsync();
    }
}
