using TaskTracker.API.Model;

namespace TaskTracker.API.Service;

public interface ITaskService
{
    /// <summary>
    /// Gets all tasks from Task Table
    /// </summary>
    /// <returns> List of taskDTOs </returns>
    Task<List<TaskDTO>> GetTasksAsync();

    /// <summary>
    /// Get single Task from Task Table by ID
    /// </summary>
    /// <param name="id">Id of Task to get</param>
    /// <returns>TaskDTO</returns>
    Task<TaskDTO?> GetTaskAsync(int id);
    Task<TaskDTO> CreateTaskAsync(TaskDTO task);
    Task<bool> UpdateTaskAsync(TaskDTO task);
    Task<bool> DeleteTaskAsync(int id);
}
