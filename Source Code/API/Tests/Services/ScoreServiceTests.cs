using API.Contexts;
using API.Exceptions;
using API.Models.DTOs;
using API.Models.Entities;
using API.Services.Implementations;
using API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Tests
{
    [TestClass]
    public class ScoreServiceTests
    {
        ApplicationDbContext _context;

        IScoreService _scoreService;

        [TestInitialize]
        public void Initialize()
        {
            var _contextOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("EventServiceTests")
                .ConfigureWarnings(b => b.Ignore(InMemoryEventId.TransactionIgnoredWarning))
                .Options;

            _context = new ApplicationDbContext(_contextOptions);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(
                new Event { EventId = 1, EventName = "Event 1" },

                new Drawing { DrawingId = 1, EventId = 1, FileId = "file1" },
                new Drawing { DrawingId = 2, EventId = 2, FileId = "file2" },

                new Scorer{ ScorerId = 1, Username = "Scorer 1" },
                new Scorer{ ScorerId = 2, Username = "Scorer 2" },

                new Score{ ScoreId = 1, DrawingId = 1, ScorerId = 1 },
                new Score{ ScoreId = 2, DrawingId = 2, ScorerId = 2 }
            );

            _context.SaveChanges();

            _scoreService = new ScoreService(_context);
        }

        // GetScoreByIdAsync

        [TestMethod]
        public async Task GetScoreByIdOk()
        {
            var sc = await _scoreService.GetScoreByIdAsync(1);
            Assert.AreEqual(1, sc.DrawingId);
        }

        [TestMethod]
        public async Task GetScoreByIdNotFound()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _scoreService.GetScoreByIdAsync(999));
        }

        // GetScoresAsync

        [TestMethod]
        public async Task GetScoresOk()
        {
            var scs = await _scoreService.GetScoresAsync(0, 20);
            Assert.AreEqual(2, scs.Length);
            Assert.AreEqual(2, scs[1].DrawingId);
        }

        // GetScoreCountAsync

        [TestMethod]
        public async Task GetScoreCount()
        {
            Assert.AreEqual(2, await _scoreService.GetScoreCountAsync());
        }

        // CreateScoreAsync

        [TestMethod]
        public async Task CreateScoreOk()
        {
            var dto = new ScoreNewDTO() {
                DrawingId = 1,
                ScorerId = 2,
            };
            var id = await _scoreService.CreateScoreAsync(dto);
            Assert.AreEqual(3, id);

            var sc = await _scoreService.GetScoreByIdAsync(id);
            Assert.AreEqual(1, sc.DrawingId);
        }
        
        // UpdateScorerAsync

        [TestMethod]
        public async Task UpdateScoreOk()
        {
            var dto = new ScoreNewDTO() {
                DrawingId = 2,
                ScorerId = 2,
            };
            await _scoreService.UpdateScoreAsync(1, dto);

            var sc = await _scoreService.GetScoreByIdAsync(1);
            Assert.AreEqual(2, sc.DrawingId);
        }

        [TestMethod]
        public async Task UpdateScoreNotFoundScore()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _scoreService.UpdateScoreAsync(999, null));
        }


        [TestMethod]
        public async Task UpdateScoreNotFoundDrawing()
        {
            var dto = new ScoreNewDTO() {
                DrawingId = 999,
                ScorerId = 2,
            };
            await Assert.ThrowsExceptionAsync<NotFound>(() => _scoreService.UpdateScoreAsync(1, dto));
        }


        [TestMethod]
        public async Task UpdateScoreNotFoundScorer()
        {
            var dto = new ScoreNewDTO() {
                DrawingId = 2,
                ScorerId = 999,
            };
            await Assert.ThrowsExceptionAsync<NotFound>(() => _scoreService.UpdateScoreAsync(1, dto));
        }
    
        // DeleteEventAsync

        [TestMethod]
        public async Task DeleteScoreOk()
        {
            Assert.AreEqual(1, (await _scoreService.GetScoreByIdAsync(1)).DrawingId);
            await _scoreService.DeleteScoreAsync(1);
            await Assert.ThrowsExceptionAsync<NotFound>(() => _scoreService.GetScoreByIdAsync(1));
        }

        [TestMethod]
        public async Task DeleteScorerNotFound()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _scoreService.DeleteScoreAsync(999));
        }
    }
}