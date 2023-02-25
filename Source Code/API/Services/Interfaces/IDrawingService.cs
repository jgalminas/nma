using API.Exceptions;
using API.Models.DTOs;

namespace API.Services.Interfaces
{
    public interface IDrawingService
    {
        Task<DrawingStreamDTO> GetDrawingByIdAsync(string fileId);
        Task DeleteDrawingAsync(string fileName);
        Task<int> UploadDrawingAsync(NewDrawingDTO data);
        Task UpdateDrawingAsync(int id, DrawingUpdateDTO data);
    }
}
