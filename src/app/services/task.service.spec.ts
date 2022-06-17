import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { tasks } from '../shared/mock/tasks';
import { NEVER, never, of } from 'rxjs';
import { TaskService } from './task.service';
import { TaskStatus } from '../models/task-status';

describe('TaskService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let taskService: TaskService;
  let TASKS = JSON.parse(JSON.stringify(tasks));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    taskService = new TaskService(httpClientSpy);
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  describe('getTasks()', () => {
    it('should return all expected tasks', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(TASKS));
      taskService.getTasks(15, 1).subscribe({
        next: (tasks) => {
          expect(tasks).toEqual(TASKS);
          done();
        },
        error: () => {
          done.fail;
        },
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTaskById()', () => {
    it('should return a single task based on given task id', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of([]));

      taskService
        .getTaskById('20cd9672-6b45-4c83-1d0c-08da482dc4e9')
        .subscribe({
          next: (task) => {
            expect(task).toEqual(task);
            done();
          },
          error: () => {
            done.fail;
          },
        });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('addTask()', () => {
    it('should create a new task based on the given task data', () => {
      const task = {
        taskName: 'Study C#',
        dateCreated: new Date('2022-06-07'),
        taskDescription: 'Start Learning C#',
        status: TaskStatus.Completed,
        tags: [
          {
            tagName: 'C#',
          },
        ],
      };
      httpClientSpy.post.and.returnValue(of(task));
      taskService.addTask(task).subscribe({
        next: (res) => {
          expect(res).toEqual(task);
        },
      });
    });
  });

  describe('editTask()', () => {
    it('should update a task based on the given id and new task data', (done: DoneFn) => {
      const newTask = {
        taskId: '20cd9672-6b45-4c83-1d0c-08da482dc4e9',
        taskName: 'Study C#',
        dateCreated: new Date('2022-06-07'),
        taskDescription: 'Start Learning C#',
        status: TaskStatus.Completed,
        tags: [
          {
            tagId: '5ee5b21d-ae7d-4530-b7ba-08da482dc4f5',
            tagName: 'C#',
            taskId: '20cd9672-6b45-4c83-1d0c-08da482dc4e9',
          },
        ],
        dateModified: new Date('2022-06-08'),
        dateCompleted: new Date('2022-06-08'),
      };

      httpClientSpy.put.and.returnValue(of(newTask));
      taskService
        .editTask('20cd9672-6b45-4c83-1d0c-08da482dc4e9', newTask)
        .subscribe({
          next: (task) => {
            expect(task).toEqual(newTask);
            done();
          },
          error: () => {
            done.fail;
          },
        });
    });
  });

  describe('deleteTask()', () => {
    it('should delete a task based on the given task id', () => {
      httpClientSpy.delete.and.returnValue(of([]));
      taskService
        .deleteTask('20cd9672-6b45-4c83-1d0c-08da482dc4e9')
        .subscribe();
      expect(httpClientSpy.delete).toHaveBeenCalledTimes(1);
    });
  });
});
