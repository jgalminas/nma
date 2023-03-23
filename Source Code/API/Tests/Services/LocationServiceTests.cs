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
    public class LocationServiceTests
    {
        ApplicationDbContext _context;

        ILocationService _locationService;

        [TestInitialize]
        public void Initialize()
        {
            var _contextOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("LocationServiceTests")
                .ConfigureWarnings(b => b.Ignore(InMemoryEventId.TransactionIgnoredWarning))
                .Options;

            _context = new ApplicationDbContext(_contextOptions);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(
                new Location { LocationId = 1, LocationName = "Location 1" },
                new Location { LocationId = 2, LocationName = "Location 2" }
            );

            _context.SaveChanges();

            _locationService = new LocationService(_context);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _context.Dispose();
        }

        // GetLocationByIdAsync

        [TestMethod]
        public async Task GetLocationByIdOk()
        {
            var loc = await _locationService.GetLocationByIdAsync(2);
            Assert.AreEqual(loc.LocationName, "Location 2");
        }

        [TestMethod]
        public async Task GetLocationByIdNotFound()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _locationService.GetLocationByIdAsync(999));
        }

        // GetLocationsAsync

        [TestMethod]
        public async Task GetLocationsOk()
        {
            var evs = await _locationService.GetLocationsAsync();
            Assert.AreEqual(evs.Length, 2);
            Assert.AreEqual(evs[0].LocationId, 1);
        }

        // GetLocationCountAsync

        [TestMethod]
        public async Task GetLocationCountOk()
        {
            Assert.AreEqual(await _locationService.GetLocationCountAsync(), 2);
        }

        // CreateLocationAsync

        [TestMethod]
        public async Task CreateLocationOk()
        {
            var dto = new LocationDTO() { LocationName = "Location X" };
            var id = await _locationService.CreateLocationAsync(dto);
            Assert.AreEqual(id, 3);

            var loc = await _locationService.GetLocationByIdAsync(id);
            Assert.AreEqual(loc.LocationName, "Location X");
        }

        // UpdateLocationAsync

        [TestMethod]
        public async Task UpdateLocationOk()
        {
            var dto = new LocationDTO() { LocationName = "New name" };
            await _locationService.UpdateLocationAsync(1, dto);

            var loc = await _locationService.GetLocationByIdAsync(1);
            Assert.AreEqual(loc.LocationName, "New name");
        }

        [TestMethod]
        public async Task UpdateLocationNotFound()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _locationService.UpdateLocationAsync(999, null));
        }

        // DeleteLocationAsync

        [TestMethod]
        public async Task DeleteLocationOk()
        {
            Assert.AreEqual((await _locationService.GetLocationByIdAsync(1)).LocationName, "Location 1");
            await _locationService.DeleteLocationAsync(1);
            await Assert.ThrowsExceptionAsync<NotFound>(() => _locationService.GetLocationByIdAsync(1));
        }

        [TestMethod]
        public async Task DeleteLocationNotFound()
        {
            await Assert.ThrowsExceptionAsync<NotFound>(() => _locationService.DeleteLocationAsync(999));
        }
    }
}