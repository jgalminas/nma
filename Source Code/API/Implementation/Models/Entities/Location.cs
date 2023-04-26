using System;
using System.Collections.Generic;

namespace API.Models.Entities
{
    public partial class Location
    {
        public Location()
        {
            Events = new HashSet<Event>();
        }

        public int LocationId { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? LocationName { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<Event> Events { get; set; }
    }
}
