using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Topic
    {
        [Key]
        public int ID { get; set; }

        public string Name { get; set; } = string.Empty;
    }
}