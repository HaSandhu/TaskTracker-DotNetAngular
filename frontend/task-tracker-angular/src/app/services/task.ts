import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {}
  private baseURL:string = "https://localhost:7238/api";

  /* Several Observables to let pages make actuall call */
  getAllTasks() : Observable<Task[]> {
    // Need to specify task type in get request
    return this.http.get<Task[]>(this.baseURL + "Tasks");
  }
}
