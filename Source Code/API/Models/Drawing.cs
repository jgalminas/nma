using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Drawing
    {
        [Key]
        public int ID { get; set; }

        public DateTime Created { get; set; }

        public int CreatorAge { get; set; }

        [ForeignKey("Event")]
        private int _eventID { get; set; }
        public Event Event { get; set; } = new Event();

        public string FileGUID { get; set; } = string.Empty;

        public string FileExt { get; set; } = string.Empty;

        public bool Deleted { get; set; }
    }
}