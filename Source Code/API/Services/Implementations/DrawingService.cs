using API.Contexts;
using API.Exceptions;
using API.Models;
using API.Models.DTOs;
using API.Models.Entities;
using API.Services.Interfaces;
using Bytewizer.Backblaze.Client;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace API.Services.Implementations
{
    public class DrawingService : IDrawingService
    {

        private readonly IConfiguration _config;
        private readonly IStorageClient _storageClient;
        private readonly ApplicationDbContext _db;

        public DrawingService(ApplicationDbContext db, IConfiguration config, IStorageClient storageClient)
        {
            _db = db;
            _config = config;
            _storageClient = storageClient;
        }

        public async Task DeleteDrawingAsync(string fileId)
        {

            throw new NotImplementedException();
        }

        /// <summary>
        /// Get drawing by file id in Backblaze S2
        /// </summary>
        /// <param name="fileId"></param>
        /// <returns> A stream containing the image data </returns>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        /// <exception cref="BadRequest"></exception>
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

        /// <summary>
        /// Upload drawing to Backblaze S2, nma-drawings bucket and save a Drawing record in the database.
        /// </summary>
        /// <param name="data"></param>
        /// <returns> The ID of the Drawing record if successful </returns>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        public async Task<int> UploadDrawingAsync(NewDrawingDTO data)
        {

            // check if event with specified ID exists
            var drawingEvent = await _db.Events.FindAsync(data.EventId);

            if (drawingEvent == null)
            {
                throw new NotFound($"Event with ID {data.EventId} doesn't exist");
            }

            // store the image in the cloud
            var fileName = Guid.NewGuid();
            var extension = data.File.FileName.Split(".")[1];

            var response = await _storageClient.UploadAsync(
                    _config["Backblaze:drawingsBucket:ID"],
                    $"{fileName}.{extension}",
                    data.File.OpenReadStream()
                );

            if (response.StatusCode == HttpStatusCode.OK)
            {

                // save the image data in the database
                var drawing = new Drawing()
                {
                    EventId = data.EventId,
                    DrawersAge = data.DrawersAge,
                    DrawersName = data.DrawersName,
                    FileId = response.Response.FileId,
                    FileName = fileName,
                    FileExt = extension
                };

                try
                {
                    await _db.Drawings.AddAsync(drawing);
                    await _db.SaveChangesAsync();

                    return drawing.DrawingId;
                }
                catch (DbUpdateException)
                {
                    throw new ServerError("Couldn't save drawing data to the database");
                }

            } else
            {
                throw new ServerError("Couldn't upload drawing to cloud");
            }

        }
    }
}
