using API.Contexts;
using API.Exceptions;
using API.Models.DTOs;
using API.Models.Entities;
using API.Services.Interfaces;
using Bytewizer.Backblaze.Client;
using EntityFramework.Exceptions.Common;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace API.Services.Implementations
{
    public class DrawingService : IDrawingService
    {

        private readonly IConfiguration _config;
        private readonly IStorageClient _storageClient;
        private readonly ApplicationDbContext _db;

        private IQueryable<DrawingDTO> GetDrawing()
        {
            return _db.Drawings.Select(d => new DrawingDTO()
            {
                // map drawing data
                Id = d.DrawingId,
                Event = new EventIdNameDTO()
                {
                    Id = d.EventId,
                    Name = d.Event.EventName ?? string.Empty
                },
                CreatedAt = d.CreatedAt,
                DrawersAge = d.DrawersAge,
                DrawersName = d.DrawersName,
                isScored = d.Scores.Count != 0,
                ImageUrl = $"/drawing/image/{d.FileId}"
            });
        }
        private IQueryable<DrawingDTO> GetDrawingWithScores()
        {
            return _db.Drawings.Select(d => new DrawingDTO()
            {
                // map drawing data
                Id = d.DrawingId,
                Event = new EventIdNameDTO()
                {
                    Id = d.EventId,
                    Name = d.Event.EventName ?? string.Empty,
                },
                CreatedAt = d.CreatedAt,
                DrawersAge = d.DrawersAge,
                DrawersName = d.DrawersName,
                ImageUrl = $"/drawing/image/{d.FileId}",
                isScored = d.Scores.Count != 0,

                // map score data
                Scores = d.Scores.Select(s => new ScoreDTO()
                {
                    ScoreId = s.ScoreId,
                    Breadth = s.TopicScores.Count(),
                    ScoredAt = s.ScoredAt,
                    ScoredBy = s.Scorer.Username ?? string.Empty,
                    Notes = s.Notes,

                    //map scores for each topic
                    TopicScores = s.TopicScores.Select(ts => new TopicScoreDTO()
                    {
                        TopicScoreId = ts.TopicScoreId,
                        TopicName = ts.Topic.TopicName,
                        Depth = ts.Depth,
                        Extent = ts.Extent
                    }).ToArray()

                }).ToArray()

            });
        }

        public DrawingService(ApplicationDbContext db, IConfiguration config, IStorageClient storageClient)
        {
            _db = db;
            _config = config;
            _storageClient = storageClient;
        }

        /// <summary>
        /// Delete drawing record from database and image from Backblaze S2
        /// </summary>
        /// <param name="id"></param>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        public async Task DeleteDrawingAsync(int id)
        {

            // get drawing
            var drawing = await _db.Drawings.FindAsync(id);

            if (drawing == null)
            {
                throw new NotFound($"Drawing with id {id} doesn't exist");
            }

            // delete image from Backblaze S2
            var response = await _storageClient.Files.DeleteAsync(
                    drawing.FileId,
                    $"{drawing.FileName}.{drawing.FileExt}"
                );

            if (!response.IsSuccessStatusCode)
            {
                throw new ServerError();
            }

            // delete drawing record from database
            _db.Drawings.Remove(drawing);

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw new ServerError();
            }

        }

        /// <summary>
        /// Get drawing by file id in Backblaze S2
        /// </summary>
        /// <param name="fileId"></param>
        /// <returns> A stream containing the image data </returns>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        /// <exception cref="BadRequest"></exception>
        public async Task<DrawingStreamDTO> GetDrawingByIdAsync(string fileId)
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
                return new DrawingStreamDTO(stream, response.Response.ContentType);
            }

        }

        /// <summary>
        /// Get drawing data by id, including the scores
        /// </summary>
        /// <param name="id"></param>
        /// <returns> Drawing data </returns>
        /// <exception cref="NotFound"></exception>
        public async Task<DrawingDTO> GetDrawingByIdAsync(int id, bool withScores)
        {
            DrawingDTO drawing;

            if (!withScores)
            {
                drawing = await GetDrawing().FirstOrDefaultAsync(d => d.Id == id);
            }
            else
            {
                drawing = await GetDrawingWithScores().FirstOrDefaultAsync(d => d.Id == id);
            }

            if (drawing == null)
            {
                throw new NotFound($"Drawing with id {id} doesn't exist");
            }

            return drawing;
        }

        /// <summary>
        /// Get the count of drawings in the database
        /// </summary>
        /// <returns> numer of drawings </returns>
        public async Task<int> GetDrawingCountAsync()
        {
            return await _db.Drawings.CountAsync();
        }

        /// <summary>
        /// Update some drawing values - drawers name, age and the event id.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="data"></param>
        /// <exception cref="NotFound"></exception>
        public async Task UpdateDrawingAsync(int id, DrawingUpdateDTO data)
        {

            var drawing = await _db.Drawings.FindAsync(id);

            if (drawing == null)
            {
                throw new NotFound($"Drawing with id {id} doesn't exist");
            }

            drawing.DrawersName = data.DrawersName;
            drawing.DrawersAge = data.DrawersAge;
            drawing.EventId = data.EventId;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (ReferenceConstraintException)
            {
                throw new NotFound($"Event with id {data.EventId} doesn't exist");
            }

        }

        /// <summary>
        /// Upload drawing to Backblaze S2, nma-drawings bucket and save a Drawing record in the database.
        /// </summary>
        /// <param name="data"></param>
        /// <returns> The ID of the Drawing record if successful </returns>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        public async Task<int> UploadDrawingAsync(DrawingNewDTO data)
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

            }
            else
            {
                throw new ServerError("Couldn't upload drawing to cloud");
            }

        }


        /// <summary>
        /// Get drawings
        /// </summary>
        /// <param name="count"></param>
        /// <param name="unscoredOnly"></param>
        /// <returns> array of drawings </returns>
        public async Task<ICollection<DrawingDTO>> GetDrawingsAsync(int page, int count, bool unscoredOnly)
        {
            if (unscoredOnly)
            {
                return await _db.Drawings
                    .Where(d => !d.Scores.Any())
                    .Select(d => new DrawingDTO()
                    {
                        // map drawing data
                        Id = d.DrawingId,
                        Event = new EventIdNameDTO()
                        {
                            Id = d.EventId,
                            Name = d.Event.EventName ?? string.Empty,
                        },
                        CreatedAt = d.CreatedAt,
                        DrawersAge = d.DrawersAge,
                        DrawersName = d.DrawersName,
                        ImageUrl = $"/api/drawing/image/{d.FileId}",
                    })
                    .Skip(page * count)
                    .Take(count)
                    .ToArrayAsync();
            }
            else
            {
                return await GetDrawing()
                    .Skip(page * count)
                    .Take(count)
                    .ToArrayAsync();
            }

        }
    }
}
