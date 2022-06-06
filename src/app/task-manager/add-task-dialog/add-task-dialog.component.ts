import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TaskStatus } from 'src/app/models/task-status';
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
    dateCreated: new FormControl(Date.now()),
    status: new FormControl(TaskStatus.New),
  });
  constructor(
    public dialog: MatDialog,
    private matDialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public addTask: any
  ) {}

  ngOnInit(): void {
    console.log(this.addTaskForm);
  }

  onCreate() {
    console.log(this.addTaskForm.value);
    const dialog = this.dialog.open(TaskDialogComponent, {
      data: { message: 'Task created successfully' },
    });
    this.matDialogRef.close();
  }
}
