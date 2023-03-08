using System;
using System.Collections.Generic;

namespace API.Models.Entities
{
    public partial class Score
    {
        public Score()
        {
            TopicScores = new HashSet<TopicScore>();
        }

        public int ScoreId { get; set; }
        public int? DrawingId { get; set; }
        public int? ScorerId { get; set; }
        public DateTime? ScoredAt { get; set; }
        public string? Notes { get; set; }

        public virtual Drawing? Drawing { get; set; }
        public virtual Scorer? Scorer { get; set; }
        public virtual ICollection<TopicScore> TopicScores { get; set; }
    }
}
