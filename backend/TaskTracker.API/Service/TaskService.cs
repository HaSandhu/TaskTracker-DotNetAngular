using TaskTracker.API.Model;
using TaskTracker.API.Repository;

namespace TaskTracker.API.Service;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _repo;

    public TaskService(ITaskRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<TaskDTO>> GetTasksAsync() => await _repo.GetAllAsync();

    public async Task<TaskDTO?> GetTaskAsync(int id) => await _repo.GetByIdAsync(id);

    public async Task<TaskDTO> CreateTaskAsync(TaskDTO task) => await _repo.AddAsync(task);

    public async Task<bool> UpdateTaskAsync(TaskDTO task)
    {
        var existing = await _repo.GetByIdAsync(task.Id);
        if (existing == null) return false;

        existing.Title = task.Title;
        existing.Description = task.Description;
        existing.Status = task.Status;

        await _repo.UpdateAsync(existing);
        return true;
    }

    public async Task<bool> DeleteTaskAsync(int id)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing == null) return false;

        await _repo.DeleteAsync(id);
        return true;
    }
}
