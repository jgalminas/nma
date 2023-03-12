using API.Exceptions;
using API.Models.DTOs;

namespace API.Services.Interfaces
{
    public interface IDrawingService
    {
        Task<DrawingStreamDTO> GetDrawingByIdAsync(string fileId);
        Task DeleteDrawingAsync(int id);
        Task<int> UploadDrawingAsync(NewDrawingDTO data);
        Task UpdateDrawingAsync(int id, DrawingUpdateDTO data);
        Task <DrawingDTO> GetDrawingByIdAsync(int id);
    }
}
