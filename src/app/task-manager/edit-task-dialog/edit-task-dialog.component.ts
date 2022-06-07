import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
})
export class EditTaskDialogComponent implements OnInit {
  updateTaskForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    tags: new FormControl(null),
    dateCreated: new FormControl(null, Validators.required),
    dateModified: new FormControl(Date.now()),
    status: new FormControl(null, Validators.required),
  });

  taskStatus: any = [
    {
      value: 'New',
      label: 'New',
    },
    {
      value: 'In Progress',
      label: 'In Progress',
    },
    {
      value: 'Completed',
      label: 'Completed',
    },
  ];
  constructor(
    public dialog: MatDialog,
    public matDialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public taskData: any
  ) {}

  ngOnInit(): void {
    console.log(this.taskData);
    this.updateTaskForm.controls['name'].setValue(this.taskData.taskName);
    this.updateTaskForm.controls['description'].setValue(
      this.taskData.taskDescription
    );
    this.updateTaskForm.controls['tags'].setValue(
      this.taskData.tags[0].tagName
    );
    this.updateTaskForm.controls['dateCreated'].setValue(
      this.taskData.dateCreated
    );
    console.log(this.taskData.status);
    this.updateTaskForm.controls['status'].setValue(this.taskData.status);
  }

  onUpdate() {
    console.log(this.updateTaskForm.value);
    const dialog = this.dialog.open(TaskDialogComponent, {
      data: { message: 'Task updated successfully' },
    });
    this.matDialogRef.close();
  }
}
