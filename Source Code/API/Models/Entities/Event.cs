using System.ComponentModel.DataAnnotations;

namespace API.Models.Entities
{
    public class Event
    {
        [Key]
        public int ID { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Notes { get; set; } = string.Empty;

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public bool Virtual { get; set; }
    }
}