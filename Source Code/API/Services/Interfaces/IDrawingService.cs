using API.Models;
using API.Exceptions;
using API.Models.DTOs;

namespace API.Services.Interfaces
{
    public interface IDrawingService
    {
        Task<DrawingStream> GetDrawingByIdAsync(string fileId);
        Task DeleteDrawingAsync(string fileName);
        Task<int> UploadDrawingAsync(NewDrawingDTO data);
    }
}
