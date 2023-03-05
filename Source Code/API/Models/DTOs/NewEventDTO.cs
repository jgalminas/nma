namespace API.Models.DTOs
{
    public class NewEventDTO
    {
        public int LocationID { get; set; }
        public string EventName { get; set; }
        public string Notes { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? FinishTime { get; set; }
    }
}
