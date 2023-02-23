﻿using System;
using System.Collections.Generic;

namespace API.Models.Entities
{
    public partial class Drawing
    {
        public Drawing()
        {
            Scores = new HashSet<Score>();
        }

        public int DrawingId { get; set; }
        public int? EventId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? DrawersAge { get; set; }
        public string? FileId { get; set; }
        public string? FileExt { get; set; }

        public virtual Event? Event { get; set; }
        public virtual ICollection<Score> Scores { get; set; }
    }
}
