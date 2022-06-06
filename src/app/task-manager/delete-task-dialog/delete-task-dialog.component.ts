import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.scss'],
})
export class DeleteTaskDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public matDialogRef: MatDialogRef<DeleteTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public taskData: any
  ) {}

  ngOnInit(): void {}

  onDelete() {
    const dialog = this.dialog.open(TaskDialogComponent, {
      data: { message: 'Task deleted successfully' },
    });
    this.matDialogRef.close();
  }
}
