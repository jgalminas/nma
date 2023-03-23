using API.Contexts;
using API.Exceptions;
using API.Models.Entities;
using API.Services.Implementations;
using API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Tests
{
    [TestClass]
    public class EventServiceTests
    {
        ApplicationDbContext _context;

        IEventService _eventService;

        [TestInitialize]
        public void Initialize()
        {
            var _contextOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("BloggingControllerTest")
                .ConfigureWarnings(b => b.Ignore(InMemoryEventId.TransactionIgnoredWarning))
                .Options;

            _context = new ApplicationDbContext(_contextOptions);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(
                new Event { EventId = 1, EventName = "Event 1" },
                new Event { EventId = 2, EventName = "Event 2" },
                new Event { EventId = 3, EventName = "Event 3" }
            );

            _context.SaveChanges();

            _eventService = new EventService(_context);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _context.Dispose();
        }

        [TestMethod]
        public async Task GetEventByIdOk()
        {
            var ev = await _eventService.GetEventByIdAsync(2);
            Assert.AreEqual(ev.EventName, "Event 2");
        }

        [TestMethod]
        public async Task GetEventByIdNotFound()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _eventService.GetEventByIdAsync(999));
        }
    }
}