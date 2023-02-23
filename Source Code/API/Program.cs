using API.Contexts;
using API.Models;
using API.Services.Implementations;
using API.Services.Interfaces;
using Bytewizer.Backblaze.Client;
using Microsoft.EntityFrameworkCore;

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


// Db Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration["ConnectionStrings:DB"]);
});

// Services
builder.Services.AddScoped<IDrawingService, DrawingService>();

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
