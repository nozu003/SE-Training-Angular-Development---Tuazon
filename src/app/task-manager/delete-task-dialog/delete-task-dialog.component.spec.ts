import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { TaskService } from 'src/app/services/task.service';
import { MockTaskService } from 'src/app/shared/mock/mock-task-service';
import { tasks } from 'src/app/shared/mock/tasks';
import { of } from 'rxjs';

import { DeleteTaskDialogComponent } from './delete-task-dialog.component';

describe('DeleteTaskDialogComponent', () => {
  let component: DeleteTaskDialogComponent;
  let fixture: ComponentFixture<DeleteTaskDialogComponent>;
  let service: MockTaskService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTaskDialogComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogModule },
        {
          provide: MAT_DIALOG_DATA,
          useValue: MatDialogModule,
        },
        { provide: TaskService, useClass: MockTaskService },
      ],
    }).compileComponents();
    service = new MockTaskService();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a task data', () => {
    component.taskData = {
      taskId: '20cd9672-6b45-4c83-1d0c-08da482dc4e9',
      taskName: 'Study C#',
      dateCreated: '2022-06-07T00:00:00',
      taskDescription: 'Start Learning C#',
      status: 2,
      tags: [
        {
          tagId: '5ee5b21d-ae7d-4530-b7ba-08da482dc4f5',
          tagName: 'C#',
          taskId: '20cd9672-6b45-4c83-1d0c-08da482dc4e9',
        },
      ],
      dateModified: '2022-06-08T00:00:00',
      dateCompleted: '2022-06-08T00:00:00',
    };

    component.onDelete();
    service
      .deleteTask({
        taskId: '20cd9672-6b45-4c83-1d0c-08da482dc4e9',
        taskName: 'Study C#',
        dateCreated: '2022-06-07T00:00:00',
        taskDescription: 'Start Learning C#',
        status: 2,
        tags: [
          {
            tagId: '5ee5b21d-ae7d-4530-b7ba-08da482dc4f5',
            tagName: 'C#',
            taskId: '20cd9672-6b45-4c83-1d0c-08da482dc4e9',
          },
        ],
        dateModified: '2022-06-08T00:00:00',
        dateCompleted: '2022-06-08T00:00:00',
      })
      .subscribe({
        next: (res) => {
          expect(res.length).toBeLessThan(tasks.length);
        },
      });
  });
});
