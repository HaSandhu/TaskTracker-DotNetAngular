using TaskTracker.API.Model;

namespace TaskTracker.API.Repository;

public interface ITaskRepository
{
    Task<List<TaskDTO>> GetAllAsync();
    Task<TaskDTO?> GetByIdAsync(int id);
    Task<TaskDTO> AddAsync(TaskDTO task);
    Task UpdateAsync(TaskDTO task);
    Task DeleteAsync(int id);
}
