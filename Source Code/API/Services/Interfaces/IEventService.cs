using API.Models.DTOs;
using API.Models.Entities;

namespace API.Services.Interfaces
{
    public interface IEventService
    {
        Task<EventDTO> GetEventByIdAsync(int id);
        Task<EventDTO[]> GetEventsAsync(int page, int count);
        Task<int> CreateEventAsync(EventNewDTO data);
        Task UpdateEventAsync(int id, EventUpdateDTO data);
        Task DeleteEventAsync(int id);
        Task<int> GetEventCountAsync();
        Task<IdNameDTO[]> GetEventListAsync();

    }
}
