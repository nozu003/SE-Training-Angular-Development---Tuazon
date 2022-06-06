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
import { FilterPipe } from './shared/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TaskManagerComponent,
    TaskDialogComponent,
    EditTaskDialogComponent,
    AddTaskDialogComponent,
    DeleteTaskDialogComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
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
