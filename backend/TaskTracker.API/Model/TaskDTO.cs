namespace TaskTracker.API.Model;

public enum taskStatus : ushort
{
    ToDo, InProgress, Blocked, Done, Deleted
}

public class TaskDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public taskStatus Status { get; set; } = taskStatus.InProgress; // Todo, InProgress, Done
    public string taskPriority { get; set; } = string.Empty;
    public DateTime? dueDate {get; set;}
    public DateTime? createdDate {get; set;}
    public DateTime? updatedDate {get; set;}
    public string? userName { get; set; }
    public string[]? tags { get; set; }
    public string? blockedDesc { get; set; }
}
