import { Component } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';
// import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { nextTick } from 'process';

@Component({
  selector: 'app-task-list',
  imports: [TaskCard, CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  tasks: Task[] = [];
  err? : any;
  
  // singleTask : Task = {id: 1, title: "Some Title", description: "Some Task Description", status: 'InProgress'};
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }
  
  public loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      // Subscriber takes next function to parse data after call has been made
      // .then of sorts
      next: (data: Task[]) => {
        this.err = ""; // Clear Error Message
        this.tasks = data;
        console.log("Tasks loaded successfully:", this.tasks);
      },
      error: (err: any) => { // 'err' is the error object (e.g., from handleError)
        this.err = err.message || 'An unknown error occurred.';
        console.error("Error fetching tasks:", err);
      },
      complete: () => {
        console.log("Task fetching completed.");
      }
    });
  }

  public deleteTask(data: Task): void {
    console.log("Inside DeleteTask: " + data.id);
    // console.dir(data);
    // this.tasks.filter(value => value.id)
    this.taskService.deleteTask(data.id).subscribe({
      error: (err: any) => {
        console.error(err);
      }
    });
    this.tasks = this.tasks.filter(task => task.id != data.id);
  }

}
