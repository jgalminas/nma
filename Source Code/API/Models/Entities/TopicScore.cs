using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models.Entities
{
    public class TopicScored
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Score")]
        private int _scoreID { get; set; }
        public Score Score { get; set; } = new Score();

        [ForeignKey("Topic")]
        private int _topicID { get; set; }
        public Topic Topic { get; set; } = new Topic();

        public int Depth { get; set; }

        public int Extent { get; set; }
    }
}