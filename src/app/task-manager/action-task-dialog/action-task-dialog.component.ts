import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TaskStatus } from 'src/app/models/task-status';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-action-task-dialog',
  templateUrl: './action-task-dialog.component.html',
  styleUrls: ['./action-task-dialog.component.scss'],
})
export class ActionTaskDialogComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    tags: new FormControl(null),
    dateCreated: new FormControl(Date.now()),
    dateModified: new FormControl(null),
    dateCompleted: new FormControl(null),
    status: new FormControl(TaskStatus.New),
  });

  constructor(
    public dialog: MatDialog,
    private matDialogRef: MatDialogRef<ActionTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public taskData: any
  ) {}

  ngOnInit(): void {}

  onCreate() {
    console.log(this.taskForm.value);
    const dialog = this.dialog.open(TaskDialogComponent, {
      data: { message: 'Task created successfully' },
    });
    this.matDialogRef.close();
  }
}
