using API.Contexts;
using API.Exceptions;
using API.Models.Entities;
using API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Services.Implementations
{
    public class ScorerService : IScorerService
    {

        private readonly ApplicationDbContext _db;

        public ScorerService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<int> CreateScorerAsync(string username)
        {

            var scorer = new Scorer()
            {
                Username = username
            };

            await _db.Scorers.AddAsync(scorer);

            try
            {
                await _db.SaveChangesAsync();

            }
            catch (DbUpdateException)
            {
                throw new ServerError("Couldn't create scorer.");
            }

            return scorer.ScorerId;
        }

        public async Task DeleteScorerByIdAsync(int id)
        {
            if (await _db.FindScorerAsync(id) is Scorer scorer)
            {

                scorer.IsDeleted = true;

                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    throw new ServerError();
                }
            }
            else
            {
                throw new NotFound($"Scorer with id {id} doesn't exist");
            }
        }

        public async Task<Scorer> GetScorerByIdAsync(int id)
        {
            if (await _db.FindScorerAsync(id) is Scorer scorer)
            {
                return scorer;
            }
            else
            {
                throw new NotFound($"Score with id {id} doesn't exist");
            }
        }

        public async Task<Scorer[]> GetScorersAsync()
        {
            return await _db.Scorers.Where(s => !s.IsDeleted).ToArrayAsync();
        }

        public async Task UpdateScorerAsync(int id, string username)
        {
            if (await _db.FindScorerAsync(id) is Scorer scorer)
            {

                scorer.Username = username;

                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    throw new ServerError();
                }
            }
            else
            {
                throw new NotFound($"Scorer with id {id} doesn't exist");
            }
        }
    }
}
