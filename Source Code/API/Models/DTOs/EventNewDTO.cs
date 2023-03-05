namespace API.Models.DTOs
{
    public class EventNewDTO
    {
        public int LocationId { get; set; }
        public string EventName { get; set; }
        public string Notes { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? FinishTime { get; set; }
    }
}
