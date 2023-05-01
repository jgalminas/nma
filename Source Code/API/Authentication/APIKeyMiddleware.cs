namespace API.Middlewares
{

    public class APIKeyMiddleware
    {

        private readonly RequestDelegate _next;
        private readonly IConfiguration _config;

        public APIKeyMiddleware(RequestDelegate next, IConfiguration config)
        {
            _next = next;
            _config = config;
        }

        public async Task InvokeAsync(HttpContext context)
        {

            // if api key or client id wasn't provided
            if (!context.Request.Headers.TryGetValue(Headers.API_KEY, out var key))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Missing API key");
                return;
            }

            // check the key is of correct format
            var parts = key.ToString().Split(':');

            if (parts.Length != 2)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid API key format.");
                return;
            }

            // check the client id and key matches
            var storedKey = _config.GetSection($"API_KEYS:{parts[0]}");

            if (storedKey.Value == null || !storedKey.Value.Equals(parts[1]))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unauthorized");
                return;
            }

            await _next(context);

        }

    }
}
