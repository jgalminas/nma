namespace API.Models
{
    public class DrawingStream
    {

        public DrawingStream(Stream stream, string mymeType)
        {
            Stream = stream;
            ContentType = mymeType;
        }

        public Stream Stream { get; set; }
        public string ContentType { get; set; }
    }
}
