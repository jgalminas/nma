namespace API.Models.DTOs
{
    public class ScoreDTO
    {
        public int ScoreId { get; set; }
        public int Breadth { get; set; }
        public string? ScoredBy { get; set; }
        public DateTime? ScoredAt { get; set; }
        public string? Notes { get; set; }
        public virtual ICollection<TopicScoreDTO> TopicScores { get; set; } = new List<TopicScoreDTO>();
    }
}
