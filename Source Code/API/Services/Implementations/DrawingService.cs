using API.Exceptions;
using API.Models;
using API.Services.Interfaces;
using Bytewizer.Backblaze.Client;
using System.Net;

namespace API.Services.Implementations
{
    public class DrawingService : IDrawingService
    {

        private readonly IConfiguration _config;
        private readonly IStorageClient _storageClient;

        public DrawingService(IConfiguration config, IStorageClient storageClient)
        {
            _config = config;
            _storageClient = storageClient;
        }

        public async Task DeleteDrawingAsync(string fileId)
        {

            throw new NotImplementedException();
        }

        public async Task<DrawingStream> GetDrawingByIdAsync(string fileId)
        {

            var stream = new MemoryStream();
            var response = await _storageClient.DownloadByIdAsync(fileId, stream);

            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                throw new NotFound("Drawing with this id does not exist");
            }
            else if (response.StatusCode == HttpStatusCode.BadRequest)
            {
                throw new BadRequest("File id is not valid");
            }
            else if (response.StatusCode != HttpStatusCode.OK)
            {
                throw new ServerError("An error occured while trying to communicate with Backblaze S2 Service");
            }
            else
            {
                return new DrawingStream(stream, response.Response.ContentType);
            }

        }
    }
}
