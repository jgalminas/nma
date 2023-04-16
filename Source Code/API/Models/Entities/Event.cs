using System;
using System.Collections.Generic;

namespace API.Models.Entities
{
    public partial class Event
    {
        public Event()
        {
            Drawings = new HashSet<Drawing>();
        }

        public int EventId { get; set; }
        public int? LocationId { get; set; }
        public string? EventName { get; set; }
        public string? Notes { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? FinishTime { get; set; }
        public bool? IsDeleted { get; set; } = false;

        public virtual Location? Location { get; set; }
        public virtual ICollection<Drawing> Drawings { get; set; }
    }
}
