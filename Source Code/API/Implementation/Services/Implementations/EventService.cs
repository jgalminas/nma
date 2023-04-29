using Microsoft.EntityFrameworkCore;
using API.Models.Entities;
using API.Services.Interfaces;
using API.Contexts;
using API.Exceptions;
using API.Models.DTOs;

namespace API.Services.Implementations
{
    public class EventService : IEventService
    {
        private readonly ApplicationDbContext _db;

        public EventService(ApplicationDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// Query which maps event entity to event dto
        /// </summary>
        /// <returns></returns>
        private IQueryable<EventDTO> SelectEvent()
        {
            return _db.Events.Where(e => !e.IsDeleted).Select(e => new EventDTO()
            {
                EventId = e.EventId,
                EventName = e.EventName,
                Notes = e.Notes,
                StartTime = e.StartTime,
                FinishTime = e.FinishTime,
                Location = new IdNameDTO()
                {
                    Id = e.Location.LocationId,
                    Name = e.Location.LocationName
                }
            });
        }

        /// <summary>
        /// Get event by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns> An event object </returns>
        /// <exception cref="NotFound"></exception>
        public async Task<EventDTO> GetEventByIdAsync(int id)
        {
            if (await SelectEvent().Where(e => e.EventId == id).FirstOrDefaultAsync() is EventDTO ev)
            {
                return ev;
            }
            else
            {
                throw new NotFound($"Event with id {id} doesn't exist");
            }
        }

        /// <summary>
        /// Get all events
        /// </summary>
        /// <returns> An array of event object </returns>
        public async Task<EventDTO[]> GetEventsAsync(int page, int count)
        {
            return await _db.Events
                .Where(e => !e.IsDeleted)
                .Select(e => new EventDTO()
                {
                    EventId = e.EventId,
                    EventName = e.EventName,
                    Notes = e.Notes,
                    StartTime = e.StartTime,
                    FinishTime = e.FinishTime,
                    Location = new IdNameDTO()
                    {
                        Id = e.Location.LocationId,
                        Name = e.Location.LocationName
                    }
                })
                .Skip(page * count)
                .Take(count)
                .ToArrayAsync();
        }

        /// <summary>
        /// Add an event to the database
        /// </summary>
        /// <param name="data"></param>
        /// <returns> An event id </returns>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        public async Task<int> CreateEventAsync(EventNewDTO data)
        {
            if (await _db.FindLocationAsync(data.LocationId) is Location location)
            {
                var ev = new Event()
                {
                    LocationId = data.LocationId,
                    EventName = data.EventName,
                    Notes = data.Notes,
                    StartTime = data.StartTime,
                    FinishTime = data.FinishTime,
                };

                try
                {
                    await _db.Events.AddAsync(ev);
                    await _db.SaveChangesAsync();

                    return ev.EventId;
                }
                catch (DbUpdateException)
                {
                    throw new ServerError("Couldn't save drawing data to the database");
                }
            }
            else
            {
                throw new NotFound($"Location with id {data.LocationId} doesn't exist");
            }
        }

        /// <summary>
        /// Modify an event object in the database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="data"></param>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        public async Task UpdateEventAsync(int id, EventUpdateDTO data)
        {
            if (await _db.FindEventAsync(id) is Event ev)
            {
                ev.LocationId = data.LocationId;
                ev.EventName = data.EventName;
                ev.Notes = data.Notes;
                ev.StartTime = data.StartTime;
                ev.FinishTime = data.FinishTime;

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
                throw new NotFound($"Event with id {id} doesn't exist");
            }
        }

        /// <summary>
        /// Delete an event object from the database
        /// </summary>
        /// <param name="id"></param>
        /// <exception cref="NotFound"></exception>
        /// <exception cref="ServerError"></exception>
        public async Task DeleteEventAsync(int id)
        {
            if (await _db.Events.FindAsync(id) is Event ev)
            {

                ev.IsDeleted = true;

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
                throw new NotFound($"Event with id {id} doesn't exist");
            }
        }

        /// <summary>
        /// Gets the total number of events in the database
        /// </summary>
        /// <returns> number of events </returns>
        public async Task<int> GetEventCountAsync()
        {
            return await _db.Events.Where(e => !e.IsDeleted).CountAsync();
        }

        /// <summary>
        /// Gets a list of all events
        /// </summary>
        /// <returns> a list containing id and name of each event </returns>
        public Task<IdNameDTO[]> GetEventListAsync()
        {
            return _db.Events.Where(e => !e.IsDeleted).Select(l => new IdNameDTO()
            {
                Id = l.EventId,
                Name = l.EventName
            }).ToArrayAsync();
        }
    }
}