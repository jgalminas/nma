using System;
using System.Collections.Generic;

namespace API.Models.Entities
{
    public partial class TopicScore
    {
        public int TopicScoreId { get; set; }
        public int? ScoreId { get; set; }
        public int? TopicId { get; set; }
        public int? Depth { get; set; }
        public int? Extent { get; set; }
        public string? DepthNotes { get; set; }
        public string? ExtentNotes { get; set; }
        public bool IsDeleted { get; set; }

        public virtual Score? Score { get; set; }
        public virtual Topic? Topic { get; set; }
    }
}
