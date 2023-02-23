using API.Models;
using API.Exceptions;

namespace API.Services.Interfaces
{
    public interface IDrawingService
    {
        /// <summary>
        /// Find drawing by name in Backblaze S2
        /// </summary>
        /// <param name="fileId"></param>
        /// <returns> A stream containing the image data </returns>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        /// <exception cref="BadRequest"></exception>
        Task<DrawingStream> GetDrawingByIdAsync(string fileId);
        Task DeleteDrawingAsync(string fileName);
    }
}
