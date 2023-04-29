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
    public class ScorerServiceTests
    {
        ApplicationDbContext _context;

        IScorerService _scorerService;

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
                // new Event { EventId = 1, EventName = "Event 1", LocationId = 1 },
                // new Event { EventId = 2, EventName = "Event 2", LocationId = 1 },
                // new Event { EventId = 3, EventName = "Event 3", LocationId = 1 },

                // new Location { LocationId = 1, LocationName = "Location 1" },
                // new Location { LocationId = 2, LocationName = "Location 2" }

                new Scorer{ ScorerId = 1, Username = "Scorer 1" },
                new Scorer{ ScorerId = 2, Username = "Scorer 2" }
            );

            _context.SaveChanges();

            _scorerService = new ScorerService(_context);
        }

        // GetScorerByIdAsync

        [TestMethod]
        public async Task GetScorerByIdOk()
        {
            var sc = await _scorerService.GetScorerByIdAsync(1);
            Assert.AreEqual("Scorer 1", sc.Username);
        }

        [TestMethod]
        public async Task GetScorerByIdNotFound()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _scorerService.GetScorerByIdAsync(999));
        }

        // GetScorersAsync

        [TestMethod]
        public async Task GetScorersOk()
        {
            var scs = await _scorerService.GetScorersAsync();
            Assert.AreEqual(2, scs.Length);
            Assert.AreEqual("Scorer 2", scs[1].Username);
        }

        // CreateScorerAsync

        [TestMethod]
        public async Task CreateScorerOk()
        {
            var id = await _scorerService.CreateScorerAsync("Scorer 3");
            Assert.AreEqual(3, id);

            var sc = await _scorerService.GetScorerByIdAsync(id);
            Assert.AreEqual("Scorer 3", sc.Username);
        }
        
        // UpdateScorerAsync

        [TestMethod]
        public async Task UpdateScorerOk()
        {
            await _scorerService.UpdateScorerAsync(1, "New name");

            var sc = await _scorerService.GetScorerByIdAsync(1);
            Assert.AreEqual("New name", sc.Username);
        }

        [TestMethod]
        public async Task UpdateScorerNotFound()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _scorerService.UpdateScorerAsync(999, null));
        }
    
        // DeleteEventAsync

        [TestMethod]
        public async Task DeleteScorerOk()
        {
            Assert.AreEqual("Scorer 1", (await _scorerService.GetScorerByIdAsync(1)).Username);
            await _scorerService.DeleteScorerByIdAsync(1);
            await Assert.ThrowsExceptionAsync<NotFound>(() => _scorerService.GetScorerByIdAsync(1));
        }

        [TestMethod]
        public async Task DeleteScorerNotFound()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _scorerService.DeleteScorerByIdAsync(999));
        }
    }
}