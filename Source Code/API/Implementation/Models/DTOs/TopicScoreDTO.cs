namespace API.Models.DTOs
{
    public class TopicScoreDTO
    {
        public int TopicScoreId { get; set; }
        public string TopicName { get; set; }
        public int? Depth { get; set; }
        public int? Extent { get; set; }
        public string DepthNotes { get; set; }
        public string ExtentNotes { get; set; }
    }
}
