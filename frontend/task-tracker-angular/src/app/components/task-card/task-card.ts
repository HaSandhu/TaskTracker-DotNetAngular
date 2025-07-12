import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCard{
    @Input({required: true}) data : Task = {id: 1, title: "Some Title", description: "Some Task Description", status: 1};
    useIcons : boolean = true;
    tooltipText: string = '';

    ngOnInit() {
      this.data.status
    }

    //Function to route to update page or something
    updateName() {
      
    }

    getStatusImg() : string | null {
        if (!this.useIcons) return null;
        // Corrected basePath to be relative to the web root (src/assets becomes just 'assets/')
        const basePath : string = 'status_icons/';
        switch(this.data.status) {
          case 0:
            return basePath + 'todo-icon.jpg';
          case 1:
            return basePath + 'pending-icon.png';
          case 2:
            return basePath + 'blocked-icon.png';
          case 3:
            return basePath + 'done-icon.png';
          case 4:
            return basePath + 'delete-icon.png';
          default:
            console.log("Hit default");
            return null;
        }
      }

      getPriorityImg() : string | null {
        // Corrected basePath to be relative to the web root
        const basePath = 'priority_icons/';
        switch(this.data.taskPriority) {
          case 'high':
            return basePath + 'red-icon.png';
          case 'medium':
            return basePath + 'yellow-icon.png';
          case 'low':
            return basePath + 'green-icon.png';
          default:
            return null;
        }
      }

     // Function to set tooltip text based on status (for interactivity)
    updateTooltipText(): void {
      this.tooltipText = `Status: ${this.data.status}`;
      if (this.data.status === 2 && this.data.blockedDesc) {
        this.tooltipText += ` - Reason: ${this.data.blockedDesc}`;
      }
    }

}
