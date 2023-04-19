namespace API.Models.DTOs
{
    public class ScoreNewDTO
    {
        public int ScoreId { get; set; }
        public int? DrawingId { get; set; }
        public int? ScorerId { get; set; }
        public DateTime? ScoredAt { get; set; }
        public string? Notes { get; set; }
        public virtual ICollection<TopicScoreNewDTO> TopicScores { get; set; } = new List<TopicScoreNewDTO>();
    }
}
