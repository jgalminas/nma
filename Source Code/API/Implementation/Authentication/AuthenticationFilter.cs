using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace API.Middlewares
{
    public class AuthenticationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            if (operation.Parameters == null)
                operation.Parameters = new List<OpenApiParameter>();

            operation.Parameters.Add(new OpenApiParameter
            {
                Name = Headers.API_KEY,
                Description = "Client application API key. (eg. key format: {clientId}:{key})",
                In = ParameterLocation.Header,
                Required = true,
                AllowEmptyValue = false,
            });
        }
    }
}
