namespace API.Models.DTOs
{
    public class DrawingStreamDTO
    {

        public DrawingStreamDTO(Stream stream, string mymeType)
        {
            Stream = stream;
            ContentType = mymeType;
        }

        public Stream Stream { get; set; }
        public string ContentType { get; set; }
    }
}
