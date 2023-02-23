using API.Models;
using API.Services.Implementations;
using API.Services.Interfaces;
using Bytewizer.Backblaze.Client;

var builder = WebApplication.CreateBuilder(args);


// Backblaze Client
builder.Services.AddSingleton<IStorageClient>(o => {
    var client = new BackblazeClient();
    client.Connect(
            builder.Configuration["Backblaze:keyID"],
            builder.Configuration["Backblaze:applicationKey"]
        );
    return client;
});


// Services
builder.Services.AddScoped<IDrawingService, DrawingService>();


builder.Services.AddDbContext<DrawingContext>();
builder.Services.AddDbContext<EventContext>();
builder.Services.AddDbContext<LocationContext>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
