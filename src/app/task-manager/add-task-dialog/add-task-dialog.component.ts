import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { TaskManagerComponent } from '../task-manager.component';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
})
export class AddTaskDialogComponent implements OnInit {
  addTaskForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    tags: new FormControl(null),
    dateCreated: new FormControl(new Date(Date.now())),
    status: new FormControl(TaskStatus.New),
  });

  constructor(
    private matDialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public addTask: any,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  addOnBlur = true;
  readonly separatorKeyCodes = [ENTER, COMMA] as const;
  tags: ITag[] = [];

  addTag(event: MatChipInputEvent) {
    const value = event.value || ''.trim();

    if (value) {
      this.tags.push({ tagName: value });
    }

    event.chipInput!.clear();
  }

  removeTag(tag: ITag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onCreate() {
    const newTask = {
      taskName: this.addTaskForm.value.name,
      taskDescription: this.addTaskForm.value.description,
      tags: this.tags,
      status: TaskStatus.New,
      dateCreated: new Date(Date.now()),
    };

    this.taskService.addTask(newTask).subscribe({
      next: (res) => {
        this.snackBar.open('Task created successfully', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['white-snackbar'],
        });
        this.matDialogRef.close();
      },
      error: (err) => {
        this.snackBar.open(err, 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['white-snackbar'],
        });
      },
    });
  }
}
