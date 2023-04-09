using Microsoft.EntityFrameworkCore;
using API.Models.Entities;
using API.Services.Interfaces;
using API.Contexts;
using API.Exceptions;
using API.Models.DTOs;

namespace API.Services.Implementations
{
    public class TopicService : ITopicService
    {
        private readonly ApplicationDbContext _db;

        public TopicService(ApplicationDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// Get all topics in the database
        /// </summary>
        /// <param name="page"></param>
        /// <param name="count"></param>
        public async Task<Topic[]> GetTopicsAsync(int page, int count)
        {
            return await _db.Topics
                            .Skip(page * count)
                            .Take(count)
                            .ToArrayAsync();
        }
    }
}