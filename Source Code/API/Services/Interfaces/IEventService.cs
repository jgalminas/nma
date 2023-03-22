using API.Models.DTOs;
using API.Models.Entities;

namespace API.Services.Interfaces
{
    public interface IEventService
    {
        Task<Event> GetEventByIdAsync(int id);
        Task<Event[]> GetEventsAsync();
        Task<int> CreateEventAsync(EventNewDTO data);
        Task UpdateEventAsync(int id, EventUpdateDTO data);
        Task DeleteEventAsync(int id);
        Task<int> GetEventCountAsync();
    }
}
