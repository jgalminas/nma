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

        /// <summary>
        /// Find drawing by name in Backblaze S2
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns> A stream containing the image data </returns>
        /// <exception cref="DrawingNotFound"></exception>
        /// <exception cref="ServerError"></exception>
        public async Task<DrawingStream> GetDrawingByName(string fileName)
        {

            var stream = new MemoryStream();
            var response = await _storageClient.DownloadAsync(
                    _config["Backblaze:drawingsBucket:name"],
                    fileName,
                    stream
                );

            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                throw new DrawingNotFound("Drawing with this id does not exist");
            } else if (response.StatusCode != HttpStatusCode.OK)
            {
                throw new ServerError("An error occured while trying to communicate with Backblaze S2 Service");
            } else
            {
                return new DrawingStream(stream, response.Response.ContentType);
            }

        }
    }
}
