import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActionTaskDialogComponent } from '../action-task-dialog.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  constructor(private actionTaskDialog: ActionTaskDialogComponent) {}

  taskData: any;
  taskForm!: FormGroup;
  ngOnInit(): void {
    this.taskData = this.actionTaskDialog.taskData;
    this.taskForm = this.actionTaskDialog.taskForm;
  }

  onCreate() {
    this.actionTaskDialog.onCreate();
  }
}
