using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class EventContext : DbContext
    {
        internal DbSet<Event> Events { get; set; }

        public Event? GetEvent(string name)
        {
            return Events.Find(name);
        }

        public Event[] GetEvents()
        {
            return Events.ToArray();
        }

        public bool AddEvent(Event ev)
        {
            if (Events.Find(ev.Name) != null) return false;
            Events.Add(ev);
            SaveChanges();
            return true;
        }

        public bool UpdateEvent(Event ev)
        {
            if (Events.Find(ev.Name) == null) return false;
            Events.Update(ev);
            SaveChanges();
            return true;
        }

        public bool DeleteEvent(string name)
        {
            if (Events.Find(name) is Event ev)
            {
                Events.Remove(ev);
                SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}