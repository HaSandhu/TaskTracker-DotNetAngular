import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCard{
    @Input({required: true}) data : Task = {id: 1, title: "Some Title", description: "Some Task Description", status: 'InProgress'};
    //Function to route to update page or something
    updateName() {
      
    }
}
