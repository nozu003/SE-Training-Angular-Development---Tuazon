import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITag } from 'src/app/models/tag.model';
import { TaskStatus } from 'src/app/models/task-status';
import { TaskService } from 'src/app/services/task.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
})
export class EditTaskDialogComponent implements OnInit {
  updateTaskForm: FormGroup = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    tags: new FormControl(null),
    dateCreated: new FormControl(null, Validators.required),
    dateModified: new FormControl(Date.now()),
    status: new FormControl(null, Validators.required),
  });

  taskStatus: any = [
    {
      value: '0',
      label: 'New',
    },
    {
      value: '1',
      label: 'In Progress',
    },
    {
      value: '2',
      label: 'Completed',
    },
  ];
  constructor(
    public matDialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public taskData: any,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTaskById(this.taskData);
  }

  addOnBlur = true;
  readonly separatorKeyCodes = [ENTER, COMMA] as const;
  tags: ITag[] = [];

  addTag(event: MatChipInputEvent) {
    const value = event.value || ''.trim();

    if (value) {
      this.tags.push({ tagName: value, taskId: this.taskData.taskId });
    }

    event.chipInput!.clear();
  }

  removeTag(tag: ITag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onUpdate() {
    let taskStatus = TaskStatus.New;
    if (this.updateTaskForm.value.status === '0') {
      taskStatus = TaskStatus.New;
    } else if (this.updateTaskForm.value.status === '1') {
      taskStatus = TaskStatus.InProgress;
    } else if (this.updateTaskForm.value.status === '2') {
      taskStatus = TaskStatus.Completed;
    }

    const updatedTask = {
      taskId: this.updateTaskForm.value.id,
      taskName: this.updateTaskForm.value.name,
      taskDescription: this.updateTaskForm.value.description,
      tags: this.tags,
      dateCreated: new Date(this.updateTaskForm.value.dateCreated),
      dateModified: new Date(Date.now()),
      status: taskStatus,
    };

    this.taskService
      .editTask(this.updateTaskForm.value.id, updatedTask)
      .subscribe((res) => {
        // this.changeDetector.detectChanges();
        this.snackBar.open('Task updated successfully', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['white-snackbar'],
        });
        this.matDialogRef.close();
      });
  }

  getTaskById(id: any) {
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.updateTaskForm.controls['id'].setValue(task[0].taskId);
        this.updateTaskForm.controls['name'].setValue(task[0].taskName);
        this.updateTaskForm.controls['description'].setValue(
          task[0].taskDescription
        );
        this.tags = task[0].tags;
        this.updateTaskForm.controls['dateCreated'].setValue(
          task[0].dateCreated
        );
        this.updateTaskForm.controls['status'].setValue(
          task[0].status.toString()
        );
      },
      error: (err) => {},
      complete: () => {},
    });
  }
}
