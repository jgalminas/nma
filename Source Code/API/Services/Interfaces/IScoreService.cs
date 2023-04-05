using API.Models.DTOs;
using API.Models.Entities;

namespace API.Services.Interfaces
{
    public interface IScoreService
    {
        Task<Score> GetScoreByIdAsync(int id);
        Task<Score[]> GetScoresAsync(int page, int count);
        Task<int> CreateScoreAsync(ScoreNewDTO data);
        Task UpdateScoreAsync(int id, ScoreDTO data);
        Task DeleteScoreAsync(int id);
        Task<int> GetScoreCountAsync();
    }
}
