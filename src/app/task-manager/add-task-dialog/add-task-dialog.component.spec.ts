import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { TaskService } from 'src/app/services/task.service';
import { MockTaskService } from 'src/app/shared/mock/mock-task-service';
import { tasks } from 'src/app/shared/mock/tasks';

import { AddTaskDialogComponent } from './add-task-dialog.component';

describe('AddTaskDialogComponent', () => {
  let component: AddTaskDialogComponent;
  let fixture: ComponentFixture<AddTaskDialogComponent>;
  let service: MockTaskService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaskDialogComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: TaskService,
          useClass: MockTaskService,
        },
      ],
    }).compileComponents();
    service = new MockTaskService();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new task data', () => {
    const tasksData = JSON.parse(JSON.stringify(tasks));
    component.addTaskForm.setValue({
      name: 'Study C#',
      dateCreated: new Date('2022-06-07'),
      description: 'Start Learning C#',
      status: 0,
      tags: [
        {
          tagName: 'C#',
        },
      ],
    });

    component.tags = [
      {
        tagName: 'C#',
      },
    ];
    component.onCreate();
    service
      .addTask({
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
      })
      .subscribe({
        next: (res) => {
          expect(res.length).toBeGreaterThan(tasks.length);
        },
      });
  });
});
