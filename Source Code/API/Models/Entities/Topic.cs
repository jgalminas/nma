using System.ComponentModel.DataAnnotations;

namespace API.Models.Entities
{
    public class Topic
    {
        [Key]
        public int ID { get; set; }

        public string Name { get; set; } = string.Empty;
    }
}