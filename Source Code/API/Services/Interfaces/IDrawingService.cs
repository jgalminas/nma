using API.Models;

namespace API.Services.Interfaces
{
    public interface IDrawingService
    {
        Task<DrawingStream> GetDrawingByName(string fileName);
    }
}
