namespace API.Models
{
    public enum CreateResult
    {
        Ok,
        AlreadyExists,
    }

    public enum UpdateDeleteResult
    {
        Ok,
        NotFound,
    }
}