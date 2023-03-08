namespace API.Models.DTOs
{
    public class NewDrawingDTO
    {
        public int EventId { get; set; }
        public IFormFile File { get; set; }
        public int DrawersAge { get; set; }
        public string DrawersName { get; set; }

    }
}
