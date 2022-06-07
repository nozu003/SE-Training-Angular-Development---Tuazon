import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditTaskDialogComponent } from '../edit-task-dialog.component';

@Component({
  selector: 'app-ed-edit-tags',
  templateUrl: './ed-edit-tags.component.html',
  styleUrls: ['./ed-edit-tags.component.scss'],
})
export class EdEditTagsComponent implements OnInit {
  updateTaskForm!: FormGroup;
  constructor(private editTaskDialog: EditTaskDialogComponent) {}

  ngOnInit(): void {
    this.updateTaskForm = this.editTaskDialog.updateTaskForm;
  }

  onUpdate() {
    this.editTaskDialog.onUpdate();
  }
}
