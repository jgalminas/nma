namespace API.Models.DTOs
{
    public class EventDTO
    {
        public int EventId { get; set; }
        public IdNameDTO Location { get; set; }
        public string? EventName { get; set; }
        public string? Notes { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? FinishTime { get; set; }

    }
}
