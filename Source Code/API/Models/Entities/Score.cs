using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models.Entities
{
    public class Score
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Drawing")]
        private int _drawingID { get; set; }
        public Drawing Drawing { get; set; } = new Drawing();

        public string Description { get; set; } = string.Empty;

        [ForeignKey("Scorer")]
        private int _scorerID { get; set; }
        public Scorer Scorer { get; set; } = new Scorer();

        public DateTime ScoredAt { get; set; }
    }
}