import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {
  createdTask? : Task;

  //Task Variables
  taskTitle! : string;
  taskDescription! : string;
  taskStatus! :  0 | 1 | 2 | 3 | 4;
  taskPriority? : 'high' | 'medium' | 'low';
  taskDueDate? : string;

  wasCreated: boolean = false;


  constructor(private service : TaskService) {}




  createTask() {
    this.createdTask = {
      id: 0,
      title: this.taskTitle,
      description: this.taskDescription,
      status: this.taskStatus,
      taskPriority: this.taskPriority,
      dueDate: this.taskDueDate
    };

    if (this.createdTask==null) return;


    this.service.createTask(this.createdTask).subscribe({
      next: (res: any) => {
        console.log("Res Status: " + res);
        // console.div(res);
        if (res.status == 204)
          this.wasCreated = true
      }
    })


  }
}
