import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskDialogComponent } from './task-manager/add-task-dialog/add-task-dialog.component';
import { TaskDialogComponent } from './task-manager/task-dialog/task-dialog.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';

const routes: Routes = [
  {
    path: '',
    component: TaskManagerComponent,
  },
  {
    path: 'task',
    component: TaskDialogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
