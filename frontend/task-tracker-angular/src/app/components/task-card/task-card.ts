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
    useIcons : boolean = true;
    tooltipText: string = '';
    //Function to route to update page or something
    updateName() {
      
    }

    getStatusImg() : string | null{
      if (!this.useIcons) return null; // Check if icons are enabled
      const basePath = '../../../../public/status_icons/';
      switch(this.data.status) {
        case 'ToDo':
          return basePath + 'todo-icon.jpg'; // Correct extension
        case 'InProgress':
          return basePath + 'pending-icon.png'; // Using pending for InProgress
        case 'Blocked':
          return basePath + 'blocked-icon.png';
        case 'Done':
          return basePath + 'done-icon.png';
        case 'Deleted':
          return basePath + 'delete-icon.png';
        default:
          return null; // Fallback if status is unrecognized
      }
    }

    getPriorityImg() : string | null {
      const basePath = '../../../../public/priority_icons/';
      switch(this.data.priority) {
        case 'High':
          return basePath + 'red-icon.png';
        case 'Medium':
          return basePath + 'yellow-icon.png';
        case 'Low':
          return basePath + 'green-icon.png';
        default:
          return null;          
      }
    }

     // Function to set tooltip text based on status (for interactivity)
    updateTooltipText(): void {
      this.tooltipText = `Status: ${this.data.status}`;
      if (this.data.status === 'Blocked' && this.data.blockedDesc) {
        this.tooltipText += ` - Reason: ${this.data.blockedDesc}`;
      }
    }
}
