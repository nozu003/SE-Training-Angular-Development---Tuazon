import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { TaskService } from 'src/app/services/task.service';
import { MockTaskService } from 'src/app/shared/mock/mock-task-service';
import { tasks } from 'src/app/shared/mock/tasks';

import { EditTaskDialogComponent } from './edit-task-dialog.component';

describe('EditTaskDialogComponent', () => {
  let component: EditTaskDialogComponent;
  let fixture: ComponentFixture<EditTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTaskDialogComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: TaskService,
          useClass: MockTaskService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update an existing task data', () => {
    const tasksData = JSON.parse(JSON.stringify(tasks));
    component.updateTaskForm.setValue({
      id: '20cd9672-6b45-4c83-1d0c-08da482dc4e9',
      name: 'Study C#',
      dateCreated: '2022-06-07T00:00:00',
      description: 'Start Learning C#',
      status: 2,
      tags: [
        {
          tagId: '5ee5b21d-ae7d-4530-b7ba-08da482dc4f5',
          tagName: 'C#',
          taskId: '20cd9672-6b45-4c83-1d0c-08da482dc4e9',
        },
      ],
      dateModified: '2022-06-08T00:00:00',
    });

    component.tags = [
      {
        tagName: 'C#',
      },
    ];
    fixture.detectChanges();
    component.onUpdate();
    fixture.detectChanges();
    expect(tasksData.length).toEqual(tasks.length);
  });
});
