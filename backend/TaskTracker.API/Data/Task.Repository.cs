using Microsoft.EntityFrameworkCore;
using TaskTracker.API.Data;
using TaskTracker.API.Model;

namespace TaskTracker.API.Repository;

public class TaskRepository : ITaskRepository
{
    private readonly TaskDbContext _context;

    public TaskRepository(TaskDbContext context)
    {
        _context = context;
    }

    public async Task<List<TaskDTO>> GetAllAsync()
        => await _context.Tasks.ToListAsync();

    public async Task<TaskDTO?> GetByIdAsync(int id)
        => await _context.Tasks.FindAsync(id);

    public async Task<TaskDTO> AddAsync(TaskDTO task)
    {
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task UpdateAsync(TaskDTO task)
    {
        _context.Entry(task).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task is not null)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }
    }
}
