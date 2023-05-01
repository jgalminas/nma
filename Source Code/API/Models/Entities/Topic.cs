using System;
using System.Collections.Generic;

namespace API.Models.Entities
{
    public partial class Topic
    {
        public Topic()
        {
            TopicScores = new HashSet<TopicScore>();
        }

        public int TopicId { get; set; }
        public string? TopicName { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<TopicScore> TopicScores { get; set; }
    }
}
