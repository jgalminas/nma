using System.ComponentModel.DataAnnotations;

namespace API.Models.Entities
{
    public class Location
    {
        [Key]
        public int ID { get; set; }

        public string Country { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string LocationName { get; set; } = string.Empty;
    }
}