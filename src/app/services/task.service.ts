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

  getTaskById(id: any): Observable<ITask> {
    return this.http.get<ITask>(this.getEndpoint('getById', id)).pipe(
      tap(() => {
        this.tasksChanged.next();
      })
    );
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
    } else {
      taskStatus = null;
    }

    const queryParams = `?pageSize=${this.postsPerPage}&pageNumber=${this.currentPage}`;

    return this.http.get<ITask[]>(this.getEndpoint('get') + queryParams).pipe(
      map((tasks) =>
        tasks.filter((task) => {
          return (
            task.status === taskStatus ||
            task.taskName.toLowerCase().includes(filterKey.toLowerCase()) ||
            task.taskDescription.toLowerCase().includes(filterKey.toLowerCase())
          );
        })
      )
    );
  }

  private getEndpoint(endpoint: string, id?: any): string {
    let endpointUrl = '';

    if (endpoint === 'get' || endpoint === 'post')
      endpointUrl = `${this.api}/tasks/`;
    else if (
      endpoint === 'getById' ||
      endpoint === 'put' ||
      endpoint === 'delete'
    )
      endpointUrl = `${this.api}/tasks/${id}`;

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
