import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { EditTaskDialogComponent } from './task-manager/edit-task-dialog/edit-task-dialog.component';
import { AddTaskDialogComponent } from './task-manager/add-task-dialog/add-task-dialog.component';
import { DeleteTaskDialogComponent } from './task-manager/delete-task-dialog/delete-task-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './shared/filter/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NumberPipe } from './shared/filter/number.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskManagerComponent,
    EditTaskDialogComponent,
    AddTaskDialogComponent,
    DeleteTaskDialogComponent,
    FilterPipe,
    NumberPipe,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
