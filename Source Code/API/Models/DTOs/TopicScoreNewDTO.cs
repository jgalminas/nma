namespace API.Models.DTOs
{
    public class TopicScoreNewDTO
    {
        public int TopicScoreId { get; set; }
        public int TopicId { get; set; }
        public int? Depth { get; set; }
        public int? Extent { get; set; }
    }
}
