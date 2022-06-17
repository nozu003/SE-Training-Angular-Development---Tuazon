import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TaskManagerComponent } from './task-manager.component';
import { RouterTestingModule } from '@angular/router/testing';
import { tasks } from '../shared/mock/tasks';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ITask } from '../models/task.model';
import { By } from '@angular/platform-browser';
import { DummyComponent } from '../shared/mock/dummy/dummy.component';
import { Location } from '@angular/common';
import { TaskStatus } from '../models/task-status';

describe('TaskManagerComponent', () => {
  let component: TaskManagerComponent;
  let fixture: ComponentFixture<TaskManagerComponent>;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskManagerComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'task',
            component: DummyComponent,
          },
          {
            path: 'task/:id',
            component: DummyComponent,
          },
        ]),
        MaterialModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {});

  it('should get task management data', () => {
    const tasksData = JSON.parse(JSON.stringify(tasks));
    http.get<ITask[]>('/tasks').subscribe({
      next: (tasks) => {
        component.dataSource.data = tasks;
        expect(component.dataSource.data.length).toEqual(tasksData.length);
      },
      error: () => {},
    });
    const request = httpController.expectOne('/tasks');
    request.flush(tasksData);
  });

  it('should navigate to /task on + button click', (done: DoneFn) => {
    const location = TestBed.get(Location);
    const linkDes = fixture.debugElement.queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement = linkDes[2].nativeElement;
    nativeButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/task');
      done();
    });
  });

  it('should filter task management data', () => {
    const tasksData = JSON.parse(JSON.stringify(tasks));
    let filterKey = '';
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
    http.get<ITask[]>('/tasks').subscribe({
      next: (tasks) => {
        component.dataSource.data = tasks.filter((task) => {
          return (
            task.status === taskStatus ||
            task.taskName.toLowerCase().includes(filterKey.toLowerCase()) ||
            task.taskDescription.toLowerCase().includes(filterKey.toLowerCase())
          );
        });
        expect(component.dataSource.data.length).toEqual(tasksData.length);
      },
      error: () => {},
    });
    const request = httpController.expectOne('/tasks');
    request.flush(tasksData);
  });
  // it('should navigate to /task:id on Edit button click', (done: DoneFn) => {
  //   const tasksData = JSON.parse(JSON.stringify(tasks));
  //   http.get<ITask[]>('/tasks').subscribe({
  //     next: (tasks) => {
  //       component.dataSource.data = tasks;
  //       expect(tasks).toEqual(tasksData);
  //     },
  //     error: () => {},
  //   });
  //   const request = httpController.expectOne('/tasks');
  //   request.flush(tasksData);

  //   const location = TestBed.get(Location);
  //   const linkDes = fixture.debugElement.queryAll(By.css('a'));
  //   const nativeAnchor: HTMLAnchorElement = linkDes[0].nativeElement;
  //   nativeAnchor.click();
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(location.path()).toBe('/task:id');
  //     done();
  //   });
  // });
});
