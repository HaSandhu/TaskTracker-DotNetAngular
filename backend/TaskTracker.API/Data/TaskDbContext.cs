using Microsoft.EntityFrameworkCore;
using TaskTracker.API.Model;

namespace TaskTracker.API.Data;

public class TaskDbContext : DbContext
{   
    //In Memory db
    public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options) { }
    //Task Table mapped to Task Item DTO
    public DbSet<TaskDTO> Tasks => Set<TaskDTO>();
}
