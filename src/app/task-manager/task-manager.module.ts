import { NgModule } from '@angular/core';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { TaskManagerComponent } from './task-manager.component';

import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TaskManagerComponent,
  },
  {
    path: 'task',
    component: AddTaskDialogComponent,
  },
  {
    path: 'task/:id',
    component: EditTaskDialogComponent,
  },
];
@NgModule({
  declarations: [
    TaskManagerComponent,
    EditTaskDialogComponent,
    AddTaskDialogComponent,
    DeleteTaskDialogComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [
    TaskManagerComponent,
    EditTaskDialogComponent,
    AddTaskDialogComponent,
    DeleteTaskDialogComponent,
    RouterModule,
  ],
})
export class TaskManagerModule {}
