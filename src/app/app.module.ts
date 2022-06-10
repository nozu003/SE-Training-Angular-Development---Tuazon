import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TaskDialogComponent } from './task-manager/task-dialog/task-dialog.component';
import { EditTaskDialogComponent } from './task-manager/edit-task-dialog/edit-task-dialog.component';
import { AddTaskDialogComponent } from './task-manager/add-task-dialog/add-task-dialog.component';
import { DeleteTaskDialogComponent } from './task-manager/delete-task-dialog/delete-task-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './shared/filter/filter.pipe';
import { AdAddTagsComponent } from './task-manager/add-task-dialog/ad-add-tags/ad-add-tags.component';
import { EdEditTagsComponent } from './task-manager/edit-task-dialog/ed-edit-tags/ed-edit-tags.component';
import { ActionTaskDialogComponent } from './task-manager/action-task-dialog/action-task-dialog.component';
import { TagsComponent } from './task-manager/action-task-dialog/tags/tags.component';
import { HttpClientModule } from '@angular/common/http';
import { NumberPipe } from './shared/filter/number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TaskManagerComponent,
    TaskDialogComponent,
    EditTaskDialogComponent,
    AddTaskDialogComponent,
    DeleteTaskDialogComponent,
    FilterPipe,
    AdAddTagsComponent,
    EdEditTagsComponent,
    ActionTaskDialogComponent,
    TagsComponent,
    NumberPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
