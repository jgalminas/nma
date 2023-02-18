namespace API.Models
{
    public class Location
    {
        public int ID { get; set; }

        public string Country { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string LocationName { get; set; } = string.Empty;
    }
}