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
    public class EventServiceTests
    {
        ApplicationDbContext _context;

        IEventService _eventService;

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
                new Event { EventId = 1, EventName = "Event 1", LocationId = 1 },
                new Event { EventId = 2, EventName = "Event 2", LocationId = 1 },
                new Event { EventId = 3, EventName = "Event 3", LocationId = 1 },

                new Location { LocationId = 1, LocationName = "Location 1" },
                new Location { LocationId = 2, LocationName = "Location 2" }
            );

            _context.SaveChanges();

            _eventService = new EventService(_context);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _context.Dispose();
        }

        // GetEventByIdAsync

        [TestMethod]
        public async Task GetEventByIdOk()
        {
            var ev = await _eventService.GetEventByIdAsync(2);
            Assert.AreEqual("Event 2", ev.EventName);
        }

        [TestMethod]
        public async Task GetEventByIdNotFound()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _eventService.GetEventByIdAsync(999));
        }

        // GetEventsAsync

        [TestMethod]
        public async Task GetEventsOk()
        {
            var evs = await _eventService.GetEventsAsync(0, 20);
            Assert.AreEqual(3, evs.Length);
            Assert.AreEqual(2, evs[1].EventId);
        }

        // GetEventCountAsync

        [TestMethod]
        public async Task GetEventCountOk()
        {
            Assert.AreEqual(3, await _eventService.GetEventCountAsync());
        }

        // CreateEventAsync

        [TestMethod]
        public async Task CreateEventOk()
        {
            var dto = new EventNewDTO()
            {
                LocationId = 1,
                EventName = "Event X",
            };
            var id = await _eventService.CreateEventAsync(dto);
            Assert.AreEqual(4, id);

            var ev = await _eventService.GetEventByIdAsync(id);
            Assert.AreEqual("Event X", ev.EventName);
        }

        [TestMethod]
        public async Task CreateEventNotFound()
        {
            var dto = new EventNewDTO() { LocationId = 999 };
            await Assert.ThrowsExceptionAsync<NotFound>(() => _eventService.CreateEventAsync(dto));
        }

        // UpdateEventAsync

        [TestMethod]
        public async Task UpdateEventOk()
        {
            var dto = new EventUpdateDTO()
            {
                LocationId = 2,
                EventName = "New name",
            };
            await _eventService.UpdateEventAsync(1, dto);

            var ev = await _eventService.GetEventByIdAsync(1);
            Assert.AreEqual(2, ev.Location.Id);
            Assert.AreEqual("New name", ev.EventName);
        }

        [TestMethod]
        public async Task UpdateEventNotFound()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _eventService.UpdateEventAsync(999, null));
        }

        // DeleteEventAsync

        [TestMethod]
        public async Task DeleteEventOk()
        {
            Assert.AreEqual("Event 1", (await _eventService.GetEventByIdAsync(1)).EventName);
            await _eventService.DeleteEventAsync(1);
            await Assert.ThrowsExceptionAsync<NotFound>(() => _eventService.GetEventByIdAsync(1));
        }

        [TestMethod]
        public async Task DeleteEventNotFound()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _eventService.DeleteEventAsync(999));
        }
    }
}