import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {}
  private baseURL:string = "https://localhost:7238/api";

  /* Several Observables to let pages make actuall call */
  getAllTasks() : Observable<Task[]> {
    // Need to specify task type in get request
    return this.http.get<Task[]>(this.baseURL + "/Tasks");
  }

  getSingleTask(id: number) : Observable<Task> {
    return this.http.get<Task>(this.baseURL + "/Tasks/" + {id});
  }

  createTask(data: Task) : Observable<any> {
    return this.http.post(this.baseURL + "/Tasks/", data);
  }

  deleteTask(id: number) : Observable<any> {
    console.dir(id);
    console.log(typeof(id));
    console.log("Making this api call: " + this.baseURL + "/Tasks/" + id);
    return this.http.delete(this.baseURL + "/Tasks/" + id);
  }
}
