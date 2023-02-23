using API.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class EventContext : DbContext
    {
        internal DbSet<Event> Events { get; set; }

        public Event? GetEvent(int id)
        {
            return Events.Find(id);
        }

        public Event[] GetEvents()
        {
            return Events.ToArray();
        }

        public CreateResult CreateEvent(Event ev)
        {
            if (Events.Find(ev.ID) != null) return CreateResult.AlreadyExists;
            Events.Add(ev);
            SaveChanges();
            return CreateResult.Ok;
        }

        public UpdateDeleteResult UpdateEvent(Event ev)
        {
            if (Events.Find(ev.ID) == null) return UpdateDeleteResult.NotFound;
            Events.Update(ev);
            SaveChanges();
            return UpdateDeleteResult.Ok;
        }

        public UpdateDeleteResult DeleteEvent(int id)
        {
            if (Events.Find(id) is Event ev)
            {
                Events.Remove(ev);
                SaveChanges();
                return UpdateDeleteResult.Ok;
            }
            else
            {
                return UpdateDeleteResult.NotFound;
            }
        }
    }
}