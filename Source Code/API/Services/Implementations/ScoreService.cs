using Microsoft.EntityFrameworkCore;
using API.Models.Entities;
using API.Services.Interfaces;
using API.Contexts;
using API.Exceptions;
using API.Models.DTOs;

namespace API.Services.Implementations
{
    public class ScoreService : IScoreService
    {
        private readonly ApplicationDbContext _db;

        public ScoreService(ApplicationDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// Add a score object by ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns> An event id </returns>
        /// <exception cref="NotFound"></exception>
        public async Task<Score> GetScoreByIdAsync(int id)
        {
            if (await _db.Scores.FindAsync(id) is Score sc)
            {
                return sc;
            }
            else
            {
                throw new NotFound($"Score with id {id} doesn't exist");
            }
        }

        /// <summary>
        /// Get all scores in the database
        /// </summary>
        /// <param name="page"></param>
        /// <param name="count"></param>
        public async Task<Score[]> GetScoresAsync(int page, int count)
        {
            return await _db.Scores
                            .Skip(page * count)
                            .Take(count)
                            .ToArrayAsync();
        }

        public async Task<int> GetScoreCountAsync()
        {
            return await _db.Scores.CountAsync();
        }

        /// <summary>
        /// Add a score to the database
        /// </summary>
        /// <param name="data"></param>
        /// <returns> A score id </returns>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        public async Task<int> CreateScoreAsync(ScoreNewDTO data)
        {
            try
            {
                foreach (TopicScoreNewDTO ts in data.TopicScores)
                {
                    if (_db.Topics.Find(ts.TopicId) == null)
                    {
                        throw new NotFound($"Topic with id {ts.TopicId} doesn't exist");
                    }

                    await _db.TopicScores.AddAsync(new TopicScore() {
                        TopicScoreId = ts.TopicScoreId,
                        ScoreId = data.ScoreId,
                        TopicId = ts.TopicId,
                        Depth = ts.Depth,
                        Extent = ts.Extent,
                    });
                }

                if (_db.Drawings.Find(data.DrawingId) == null)
                {
                    throw new NotFound($"Drawing with id {data.DrawingId} doesn't exist");
                }

                if (_db.Scorers.Find(data.ScorerId) == null)
                {
                    throw new NotFound($"Scorer with id {data.ScorerId} doesn't exist");
                }

                var sc = new Score() {
                    ScoreId = data.ScoreId,
                    DrawingId = data.DrawingId,
                    ScorerId = data.ScorerId,
                    ScoredAt = data.ScoredAt,
                    Notes = data.Notes,
                };

                await _db.Scores.AddAsync(sc);
                await _db.SaveChangesAsync();

                return sc.ScoreId;
            }
            catch (DbUpdateException)
            {
                throw new ServerError("Couldn't save score data to the database");
            }
        }

        /// <summary>
        /// Update a score in the database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="data"></param>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        public async Task UpdateScoreAsync(int id, ScoreNewDTO data)
        {
            if (await _db.Scores.FindAsync(id) is Score sc)
            {
                foreach (TopicScoreNewDTO ts_data in data.TopicScores)
                {
                    if (await _db.TopicScores.FindAsync(ts_data.TopicScoreId) is TopicScore ts)
                    {
                        ts.TopicId = ts_data.TopicId;
                        ts.Depth = ts_data.Depth;
                        ts.Extent = ts_data.Extent;
                    }
                    else
                    {
                        throw new NotFound($"TopicScore with id {ts_data.TopicScoreId} doesn't exist");
                    }
                }

                sc.DrawingId = data.DrawingId;
                sc.ScorerId = data.ScorerId;
                sc.ScoredAt = data.ScoredAt;
                sc.Notes = data.Notes;

                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    throw new ServerError("Couldn't save score data to the database");
                }
            }
            else
            {
                throw new NotFound($"Score with id {id} doesn't exist");
            }
        }

        /// <summary>
        /// Delete a score from the database
        /// </summary>
        /// <param name="id"></param>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        public async Task DeleteScoreAsync(int id)
        {
            if (await _db.Scores.FindAsync(id) is Score sc)
            {
                try {
                    foreach (TopicScore ts in sc.TopicScores)
                    {
                        _db.TopicScores.Remove(ts);
                    }
                    _db.Scores.Remove(sc);
                }
                catch (DbUpdateException)
                {
                    throw new ServerError();
                }
            }
            else
            {
                throw new NotFound($"Location with id {id} doesn't exist");
            }
        }
    }
}