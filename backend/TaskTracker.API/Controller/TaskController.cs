using Microsoft.AspNetCore.Mvc;
using TaskTracker.API.Model;
using TaskTracker.API.Service;

namespace TaskTracker.API.Controller;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _service;

    public TasksController(ITaskService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<TaskDTO>>> GetAll()
    {
        return Ok(await _service.GetTasksAsync());
    }    

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskDTO>> Get(int id)
    {
        var task = await _service.GetTaskAsync(id);
        if (task is null) return NotFound();
        return Ok(task);
    }

    [HttpPost]
    public async Task<IActionResult> Create(TaskDTO task)
    {
        var created = await _service.CreateTaskAsync(task);
        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, TaskDTO task)
    {
        if (id != task.Id) return BadRequest("Mismatched ID");

        var success = await _service.UpdateTaskAsync(task);
        if (!success) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _service.DeleteTaskAsync(id);
        if (!success) return NotFound();
        return NoContent();
    }
}
