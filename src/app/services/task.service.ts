import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  domain: string = 'https://localhost:7185';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.domain + '/api/tasks').pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error.errorMessage) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
