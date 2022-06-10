import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { ITask } from '../models/task.model';
import { environment } from 'src/environments/environment';
import { TaskStatus } from '../models/task-status';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  postsPerPage!: number;
  currentPage!: number;
  constructor(private http: HttpClient) {}

  tasksChanged = new Subject<void>();

  private api = environment.apiUrl;

  getTasks(postsPerPage: number, currentPage: number): Observable<any> {
    this.postsPerPage = postsPerPage;
    this.currentPage = currentPage;

    const queryParams = `?pageSize=${postsPerPage}&pageNumber=${currentPage}`;

    return this.http
      .get(this.getEndpoint('get') + queryParams, {
        observe: 'response',
      })
      .pipe(
        tap((data) => {
          //console.log('All', JSON.stringify(data));
        }),
        catchError(this.handleError)
      );
  }

  getTaskById(id: any): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(this.getEndpoint('getById', id))
      .pipe(map((tasks) => tasks.filter((t) => t.taskId === id)));
  }

  editTask(id: any, taskData: ITask): Observable<ITask> {
    return this.http.put<ITask>(this.getEndpoint('put', id), taskData).pipe(
      tap(() => {
        this.tasksChanged.next();
      })
    );
  }

  addTask(taskData: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.getEndpoint('post'), taskData).pipe(
      tap(() => {
        this.tasksChanged.next();
      }),
      catchError(this.handleError)
    );
  }

  deleteTask(id: any): Observable<ITask> {
    return this.http.delete<ITask>(this.getEndpoint('delete', id)).pipe(
      tap(() => {
        this.tasksChanged.next();
      })
    );
  }

  filterTask(filterKey: string): Observable<ITask[]> {
    let taskStatus: any;
    if (filterKey === 'new') {
      taskStatus = TaskStatus.New;
    } else if (filterKey === 'in progress') {
      taskStatus = TaskStatus.InProgress;
    } else if (filterKey === 'completed') {
      taskStatus = TaskStatus.Completed;
    }

    return this.http.get<ITask[]>(this.api + '/tasks').pipe(
      map((tasks) =>
        tasks.filter((t) => {
          return (
            t.status === taskStatus ||
            t.taskName.toLowerCase().includes(filterKey.toLowerCase()) ||
            t.taskDescription.toLowerCase().includes(filterKey.toLowerCase())
          );
        })
      )
    );
  }

  private getEndpoint(endpoint: string, id?: any): string {
    let endpointUrl = '';

    if (endpoint === 'get') endpointUrl = `${this.api}/tasks/`;
    else if (endpoint === 'getById') endpoint = `${this.api}/tasks/${id}`;
    else if (endpoint === 'put') endpointUrl = `${this.api}/tasks/${id}`;
    else if (endpoint === 'post') endpointUrl = `${this.api}/tasks`;
    else if (endpoint === 'delete') endpointUrl = `${this.api}/tasks/${id}`;

    return endpointUrl;
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error.errorMessage) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
