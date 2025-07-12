import { Component } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  imports: [TaskCard],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  tasks! : Observable<Task[]>; 
  singleTask : Task = {id: 1, title: "Some Title", description: "Some Task Description", status: 'InProgress'};
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    console.log("Inside task-list on init")
    this.taskService.getAllTasks().subscribe({
      // Subscriber takes next function to parse data after call has been made
      // .then of sorts
      next: (data: Task) => {
        
        this.tasks = data;
      }
    });
    console.log("Inside onInit: " + this.tasks);
    console.dir(this.tasks.subscribe());
  }
}
