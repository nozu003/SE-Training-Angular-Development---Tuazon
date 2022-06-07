import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddTaskDialogComponent } from '../add-task-dialog.component';

@Component({
  selector: 'app-ad-add-tags',
  templateUrl: './ad-add-tags.component.html',
  styleUrls: ['./ad-add-tags.component.scss'],
})
export class AdAddTagsComponent implements OnInit {
  constructor(private addTaskDialog: AddTaskDialogComponent) {}

  addTaskForm!: FormGroup;
  ngOnInit(): void {
    this.addTaskForm = this.addTaskDialog.addTaskForm;
  }

  onCreate() {
    this.addTaskDialog.onCreate();
  }
}
