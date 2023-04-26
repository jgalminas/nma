using API.Models.Entities;

namespace API.Services.Interfaces
{
    public interface ITopicService
    {
        Task<Topic[]> GetTopicsAsync(int page, int count);
    }
}
