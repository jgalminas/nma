using System;
using System.Collections.Generic;

namespace API.Models.Entities
{
    public partial class Scorer
    {
        public Scorer()
        {
            Scores = new HashSet<Score>();
        }

        public int ScorerId { get; set; }
        public string? Username { get; set; }

        public virtual ICollection<Score> Scores { get; set; }
    }
}
