import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ITag } from 'src/app/models/tag.model';
import { EditTaskDialogComponent } from '../edit-task-dialog.component';

@Component({
  selector: 'app-ed-edit-tags',
  templateUrl: './ed-edit-tags.component.html',
  styleUrls: ['./ed-edit-tags.component.scss'],
})
export class EdEditTagsComponent implements OnInit {
  updateTaskForm!: FormGroup;
  tags: any;
  addOnBlur!: boolean;
  separatorKeyCodes: any;

  constructor(private editTaskDialog: EditTaskDialogComponent) {}

  ngOnInit(): void {
    this.updateTaskForm = this.editTaskDialog.updateTaskForm;
    this.addOnBlur = this.editTaskDialog.addOnBlur;
    this.separatorKeyCodes = this.editTaskDialog.separatorKeyCodes;
    setTimeout(() => {
      this.tags = this.editTaskDialog.tags;
    }, 100);
  }

  onUpdate() {
    this.editTaskDialog.onUpdate();
  }

  addTag(event: MatChipInputEvent) {
    this.editTaskDialog.addTag(event);
  }

  removeTag(tag: ITag): void {
    this.editTaskDialog.removeTag(tag);
  }
}
