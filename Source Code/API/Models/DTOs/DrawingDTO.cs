namespace API.Models.DTOs
{
    public class DrawingDTO
    {
        public int Id { get; set; }
        public EventIdNameDTO Event { get; set;}
        public DateTime? CreatedAt { get; set; }
        public int? DrawersAge { get; set; }
        public string? DrawersName { get; set; }
        public string? ImageUrl { get; set; }
        public virtual ICollection<ScoreDTO> Scores { get; set; } = new List<ScoreDTO>();

    }
}
