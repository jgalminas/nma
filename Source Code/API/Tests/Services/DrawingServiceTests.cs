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
    public class DrawingServiceTests
    {
        ApplicationDbContext _context;

        IDrawingService _drawingService;

        [TestInitialize]
        public void Initialize()
        {
            var _contextOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("DrawingServiceTests")
                .ConfigureWarnings(b => b.Ignore(InMemoryEventId.TransactionIgnoredWarning))
                .Options;

            _context = new ApplicationDbContext(_contextOptions);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(
                new Drawing { DrawingId = 1, EventId = 1, FileId = "file1" },
                new Drawing { DrawingId = 2, EventId = 2, FileId = "file2" },

                new Score { ScoreId = 1, DrawingId = 1 },

                new Event { EventId = 1, EventName = "Event 1" },
                new Event { EventId = 2, EventName = "Event 2" },
                new Event { EventId = 3, EventName = "Event 3" },

                new Location { LocationId = 1, LocationName = "Location 1" },
                new Location { LocationId = 2, LocationName = "Location 2" }
            );

            _context.SaveChanges();

            _drawingService = new DrawingService(_context, null, null);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _context.Dispose();
        }

        // GetDrawingByIdAsync

        // TODO: can we test backblaze file storage here?

        [TestMethod]
        public async Task GetDrawingByIdOk()
        {
            var dr = await _drawingService.GetDrawingByIdAsync(2, false);
            Assert.AreEqual("Event 2", dr.Event.Name);
            Assert.AreEqual($"/drawing/image/file2", dr.ImageUrl);
        }

        [TestMethod]
        public async Task GetDrawingByIdWithScoresOk()
        {
            var dr = await _drawingService.GetDrawingByIdAsync(1, true);
            Assert.AreEqual(1, dr.Scores.Count);
            Assert.AreEqual(1, dr.Scores.ElementAt(0).ScoreId);
        }

        [TestMethod]
        public async Task GetDrawingByIdNotFound()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _drawingService.GetDrawingByIdAsync(999, false));
        }

        // GetDrawingsAsync

        [TestMethod]
        public async Task GetDrawingsOk()
        {
            var drs = await _drawingService.GetDrawingsAsync(0, 20, false);
            Assert.AreEqual(2, drs.Count);
            Assert.AreEqual(2, drs.ElementAt(1).Id);
        }

        // GetDrawingCountAsync

        [TestMethod]
        public async Task GetDrawingCountOk()
        {
            Assert.AreEqual(2, await _drawingService.GetDrawingCountAsync());
        }

        // UploadDrawingAsync

        [TestMethod]
        public async Task UploadDrawingNotFound()
        {
            var dto = new DrawingNewDTO() { EventId = 999 };
            await Assert.ThrowsExceptionAsync<NotFound>(() => _drawingService.UploadDrawingAsync(dto));
        }

        // UpdateDrawingAsync

        [TestMethod]
        public async Task UpdateDrawingOk()
        {
            var dto = new DrawingUpdateDTO()
            {
                DrawersName = "New name",
                EventId = 2,
            };
            await _drawingService.UpdateDrawingAsync(1, dto);

            var dr = await _drawingService.GetDrawingByIdAsync(1, false);
            Assert.AreEqual("New name", dr.DrawersName);
        }

        [TestMethod]
        public async Task UpdateDrawingNotFoundDrawing()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _drawingService.UpdateDrawingAsync(999, null));
        }

        [TestMethod]
        public async Task UpdateDrawingNotFoundEvent()
        {
            var dto = new DrawingUpdateDTO() { EventId = 999 };
            await Assert.ThrowsExceptionAsync<NotFound>(() => _drawingService.UpdateDrawingAsync(1, dto));
        }

        // DeleteDrawingAsync

        [TestMethod]
        public async Task DeleteDrawingOk()
        {
            await _drawingService.DeleteDrawingAsync(1);
            await Assert.ThrowsExceptionAsync<NotFound>(() => _drawingService.GetDrawingByIdAsync(1, false));
        }

        [TestMethod]
        public async Task DeleteDrawingNotFound()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _drawingService.DeleteDrawingAsync(999));
        }
    }
}