using API.Exceptions;
using API.Models.DTOs;

namespace API.Services.Interfaces
{
    public interface IDrawingService
    {
        Task<DrawingStreamDTO> GetFileById(string fileId);
        Task DeleteDrawingAsync(int id);
        Task<int> UploadDrawingAsync(DrawingNewDTO data);
        Task UpdateDrawingAsync(int id, DrawingUpdateDTO data);
        Task<DrawingDTO> GetDrawingByIdAsync(int id, bool withScores);
        Task<int> GetDrawingCountAsync();
        Task<ICollection<DrawingDTO>> GetDrawingsAsync(int page, int count, bool unscoredOnly);
    }
}
