import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() taskCreated = new EventEmitter<void>();
  createdTask? : Task;

  //Task Variables
  taskTitle! : string;
  taskDescription! : string;
  taskPriority? : 'high' | 'medium' | 'low';
  taskDueDate? : string;
  tags: string[] = [];
  currentTag?: string;
  
  // Success Notification
  wasCreated: boolean = false;
  successMessage: string = '';

  //Constructor for Task Service
  constructor(private service : TaskService) {}

  //Submit a tag
  addTag(){
    if (this.currentTag !== null && this.currentTag !== undefined)
      this.tags.push(this.currentTag.trim());
    this.currentTag = '';
  }

  //Remove a tag
  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  // Create task object, post to backend
  createTask() {
    this.createdTask = {
      id: 0,
      title: this.taskTitle,
      description: this.taskDescription,
      status: 0,
      taskPriority: this.taskPriority,
      dueDate: this.taskDueDate,
      tags: this.tags
    };

    this.service.createTask(this.createdTask).subscribe({
      next: (res: any) => {
        console.log("Res Status: " + res);
        this.formSuccess();
        //Notify task list
      },
      error: (err: any) => {
        this.showTemporaryMessage(`Error in creating "${this.createdTask?.title}" Task!`, false);
      }
    })
  }
  
  formSuccess(): void {
    this.showTemporaryMessage(`Task "${this.createdTask?.title}" created successfully!`, true);
    this.resetForm(); // Reset form after successful submission
  }

  private showTemporaryMessage(message: string, isSuccess: boolean): void {
    this.wasCreated = isSuccess;
    this.successMessage = message;
    let timeOutTime : number = isSuccess ? 3000 : 5000;

    // Hide message after a delay
    setTimeout(() => {
      this.wasCreated = false;
      this.successMessage = '';
    }, timeOutTime); // 3 seconds for success, 5 seconds for error (can be adjusted)
  }

  // Clear form 
  resetForm(): void {
    this.taskTitle = '';
    this.taskDescription = '';
    this.taskPriority = undefined;
    this.taskDueDate = undefined;
    this.tags = []; // Clear tags array
    this.currentTag = ''; // Clear current tag input

    this.wasCreated = false; // Hide success message
    this.successMessage = ''; // Clear message content
  }
}
