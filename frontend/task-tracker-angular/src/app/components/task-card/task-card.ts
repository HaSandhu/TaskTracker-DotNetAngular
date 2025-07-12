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
        console.log("Hit Status: " + this.data.status);
        switch(this.data.status) {
          case 0:
            console.log(basePath + 'todo-icon.jpg');
            return basePath + 'todo-icon.jpg';
          case 1:
            console.log(basePath + 'pending-icon.png');
            return basePath + 'pending-icon.png';
          case 2:
            console.log(basePath + 'blocked-icon.png');
            return basePath + 'blocked-icon.png';
          case 3:
            console.log(basePath + 'done-icon.png');
            return basePath + 'done-icon.png';
          case 4:
            console.log(basePath + 'delete-icon.png');
            return basePath + 'delete-icon.png';
          default:
            console.log("Hit default");
            return null;
        }
      }

      getPriorityImg() : string | null {
        // Corrected basePath to be relative to the web root
        const basePath = 'priority_icons/';
        console.log(this.data.priority);
        switch(this.data.priority) {
          case 'high':
            console.log(basePath + 'red-icon.png');
            return basePath + 'red-icon.png';
          case 'medium':
            console.log(basePath + 'yellow-icon.png');
            return basePath + 'yellow-icon.png';
          case 'low':
            console.log(basePath + 'green-icon.png');
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
