using API.Models.Entities;

namespace API.Services.Interfaces
{
    public interface IScorerService
    {
        Task<Scorer> GetScorerByIdAsync(int id);
        Scorer[] GetScorers();
        Task<int> CreateScorerAsync(string username);
        Task UpdateScorerAsync(int id, string username);
        Task DeleteScorerByIdAsync(int id);
    }
}
