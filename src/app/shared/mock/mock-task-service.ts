import { Observable, of } from 'rxjs';
import { TaskStatus } from 'src/app/models/task-status';
import { ITask, Task } from 'src/app/models/task.model';
import { tasks } from './tasks';

export class MockTaskService {
  public tasksData: ITask[] = JSON.parse(JSON.stringify(tasks));

  getTasks(postsPerPage: number, currentPage: number) {
    return of(this.tasksData);
  }

  getTaskById(id: any) {
    return of([]);
  }

  editTask(id: any, { taskData }: any) {
    return of([]);
  }

  addTask(taskData: any) {
    this.tasksData.push(taskData);
    return of(this.tasksData);
  }

  deleteTask(id: any) {
    this.tasksData = this.tasksData.filter((d) => d.taskId != id.taskId);
    return of(this.tasksData);
  }

  filterTask(filterKey: string) {
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

    this.tasksData = this.tasksData.filter(
      (task) =>
        task.status === taskStatus ||
        task.taskName.toLowerCase().includes(filterKey.toLowerCase()) ||
        task.taskDescription.toLowerCase().includes(filterKey.toLowerCase())
    );

    return of(this.tasksData);
  }
}
