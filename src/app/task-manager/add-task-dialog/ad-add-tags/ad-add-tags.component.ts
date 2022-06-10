import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ITag } from 'src/app/models/tag.model';
import { AddTaskDialogComponent } from '../add-task-dialog.component';

@Component({
  selector: 'app-ad-add-tags',
  templateUrl: './ad-add-tags.component.html',
  styleUrls: ['./ad-add-tags.component.scss'],
})
export class AdAddTagsComponent implements OnInit {
  constructor(private addTaskDialog: AddTaskDialogComponent) {}

  addTaskForm!: FormGroup;
  tags: any;
  addOnBlur!: boolean;
  separatorKeyCodes: any;

  ngOnInit(): void {
    this.addTaskForm = this.addTaskDialog.addTaskForm;
    this.tags = this.addTaskDialog.tags;
    this.addOnBlur = this.addTaskDialog.addOnBlur;
    this.separatorKeyCodes = this.addTaskDialog.separatorKeyCodes;
  }

  onCreate() {
    this.addTaskDialog.onCreate();
  }

  addTag(event: MatChipInputEvent) {
    this.addTaskDialog.addTag(event);
  }

  removeTag(tag: ITag): void {
    this.addTaskDialog.removeTag(tag);
  }
}
