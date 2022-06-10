import { ITag, Tag } from './tag.model';
import { TaskStatus } from './task-status';

export interface ITask {
  taskId?: any;
  taskName: string;
  taskDescription: string;
  tags: ITag[];
  dateCreated: Date;
  status: TaskStatus;
  dateModified?: Date;
  dateCompleted?: Date;
}

export class Task {
  public taskId: any;
  public taskName: string;
  public taskDescription: string;
  public tags: ITag[];
  public dateCreated: Date;
  public dateModified?: Date;
  public dateCompleted?: Date;
  public status: TaskStatus;

  constructor(
    taskId: any,
    taskName: string,
    taskDescription: string,
    tags: Tag[],
    dateCreated: Date,
    status: TaskStatus,
    dateModified?: Date,
    dateCompleted?: Date
  ) {
    this.taskId = taskId;
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.tags = tags;
    this.dateCreated = dateCreated;
    this.dateModified = dateModified;
    this.status = status;
    this.dateCompleted = dateCompleted;
  }
}
