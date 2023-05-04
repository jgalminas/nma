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
    public class TopicServiceTests
    {
        ApplicationDbContext _context;

        ITopicService _topicService;

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
                new Topic{ TopicId = 1, TopicName = "Topic 1" },
                new Topic{ TopicId = 2, TopicName = "Topic 2" }
            );

            _context.SaveChanges();

            _topicService = new TopicService(_context);
        }

        // GetTopicsAsync

        [TestMethod]
        public async Task GetTopics()
        {
            var ts = await _topicService.GetTopicsAsync(0, 20);
            Assert.AreEqual(2, ts.Length);
            Assert.AreEqual("Topic 2", ts[1].TopicName);
        }
    }
}