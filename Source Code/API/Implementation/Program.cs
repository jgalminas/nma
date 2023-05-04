using System.Reflection;
using API.Contexts;
using API.Middlewares;
using API.Services.Implementations;
using API.Services.Interfaces;
using Bytewizer.Backblaze.Client;
using EntityFramework.Exceptions.SqlServer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


// Backblaze Client
builder.Services.AddSingleton<IStorageClient>(o =>
{
    var client = new BackblazeClient();
    client.Connect(
            builder.Configuration["Backblaze:keyID"],
            builder.Configuration["Backblaze:applicationKey"]
        );
    return client;
});

// Db Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(
        builder.Environment.IsProduction()
        ? builder.Configuration["ConnectionStrings:DB"]
        : builder.Configuration["ConnectionStrings:DB_DEV"]
        , options =>
    {
        options.EnableRetryOnFailure();
    });

    options.UseExceptionProcessor();
});


var AllowAny = "allowAny";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowAny, policy => policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
    );
});


// Services
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<IDrawingService, DrawingService>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IScoreService, ScoreService>();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<ITopicService, TopicService>();
builder.Services.AddScoped<IScorerService, ScorerService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    string? xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

    // add authentication params
    options.OperationFilter<AuthenticationFilter>();
});
builder.Services.AddMemoryCache();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();


app.UseCors(AllowAny);

app.UseHttpsRedirection();

app.UseMiddleware<APIKeyMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
