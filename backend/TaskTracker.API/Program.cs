using Microsoft.EntityFrameworkCore;
using TaskTracker.API.Data;
using TaskTracker.API.Repository;
using TaskTracker.API.Service;

var builder = WebApplication.CreateBuilder(args);

// EF Core with InMemory DB
builder.Services.AddDbContext<TaskDbContext>(options =>
    options.UseInMemoryDatabase("TaskDb"));

// Swagger (OpenAPI)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS for Angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Register Repos & Services
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

builder.Services.AddControllers();

var app = builder.Build();

// Use CORS
app.UseCors("AllowAngularApp");

// Swagger only in dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
