export interface ITag {
  tagId: any;
  tagName: string;
  taskId: any;
}

export class Tag {
  public tagId: any;
  public tagName: string;
  public taskId: any;

  constructor(tagId: any, tagName: string, taskId: any) {
    this.tagId = tagId;
    this.tagName = tagName;
    this.taskId = taskId;
  }
}
