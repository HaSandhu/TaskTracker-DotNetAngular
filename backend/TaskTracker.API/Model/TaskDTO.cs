namespace TaskTracker.API.Model;

public enum taskStatus : ushort
{
    ToDo, InProgress, Done, Deleted
}

public class TaskDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public taskStatus Status { get; set; } = taskStatus.InProgress; // Todo, InProgress, Done
}
