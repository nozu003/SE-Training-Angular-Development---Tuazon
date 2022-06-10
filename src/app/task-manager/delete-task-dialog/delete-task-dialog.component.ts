import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.scss'],
})
export class DeleteTaskDialogComponent implements OnInit {
  constructor(
    public matDialogRef: MatDialogRef<DeleteTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public taskData: any,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onDelete() {
    this.taskService.deleteTask(this.taskData).subscribe((res) => {
      this.snackBar.open('Task deleted successfully', 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['white-snackbar'],
      });
      this.matDialogRef.close();
    });
  }
}
