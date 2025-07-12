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
  taskPriority? : 'high' | 'medium' | 'low';
  taskDueDate? : string;
  tags: string[] = [];
  tag?: string;
  // total: number = this.tags?.length
  wasCreated: boolean = false;


  constructor(private service : TaskService) {}

  submitTag(){
    if (this.tag !== null && this.tag !== undefined)
      this.tags.push(this.tag);
  }


  createTask() {
    this.createdTask = {
      id: 0,
      title: this.taskTitle,
      description: this.taskDescription,
      status: 0,
      taskPriority: this.taskPriority,
      dueDate: this.taskDueDate
    };
    console.log(this.createTask);
    if (this.createdTask==null) return;


    // this.service.createTask(this.createdTask).subscribe({
    //   next: (res: any) => {
    //     console.log("Res Status: " + res);
    //     // console.div(res);
    //     if (res.status == 204)
    //       this.wasCreated = true
    //   }
    // })


  }
}
