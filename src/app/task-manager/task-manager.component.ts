import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tag } from '../models/tag.model';
import { TaskStatus } from '../models/task-status';
import { ITask, Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { ActionTaskDialogComponent } from './action-task-dialog/action-task-dialog.component';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent implements OnInit {
  /**
   * Header for the table columns
   */
  displayedColumns: string[] = [
    '#',
    'name',
    'description',
    'tags',
    'created',
    'modified',
    'status',
    'completed',
    'action',
  ];

  /**
   * Array for tasks
   */
  TASK_DATA: ITask[] = [
    new Task(
      1,
      'Learn C#',
      'Start Learning C#',
      [new Tag(1, 'C#', 1)],
      new Date('06-03-2022'),
      TaskStatus.New,
      undefined,
      undefined
    ),
    new Task(
      2,
      'Learn Java',
      'Start Learning Java',
      [new Tag(2, 'Java', 2)],
      new Date('06-03-2022'),
      TaskStatus.InProgress,
      new Date('06-03-2022'),
      undefined
    ),
    new Task(
      3,
      'Learn Angular',
      'Start Learning Angular',
      [new Tag(3, 'Angular', 3)],
      new Date('06-03-2022'),
      TaskStatus.Completed,
      new Date('06-04-2022'),
      new Date('06-05-2022')
    ),
    new Task(
      4,
      'Learn JavaScript',
      'Start Learning JavaScript',
      [new Tag(4, 'JavaScript', 4)],
      new Date('06-03-2022'),
      TaskStatus.New,
      undefined,
      undefined
    ),
    new Task(
      5,
      'Learn API',
      'Start Learning API',
      [new Tag(5, 'API', 5)],
      new Date('06-03-2022'),
      TaskStatus.New,
      undefined,
      undefined
    ),
    new Task(
      6,
      'Learn ASP.NET',
      'Start Learning ASP.NET',
      [new Tag(6, 'ASP.NET', 6)],
      new Date('06-03-2022'),
      TaskStatus.New,
      undefined,
      undefined
    ),
  ];
  /**
   * totalPost is used for counting of the POSTED data
   */
  totalPosts = 0;
  /**
   * postsPerPage is used to indicate the number of displayed data inside the table
   */
  postsPerPage = 5;
  /**
   * currentPage is used to indicate the current page number
   */
  currentPage = 1;
  /**
   * pageSizeOptions is used to have a choices in the number of displayed data
   */
  pageSizeOptions = [5, 10, 15];

  /**
   * Data source for the table using the ITask model
   */
  dataSource: any;

  /**
   * Variable for the TaskStatus Enum
   */
  taskStatuses = [TaskStatus.New, TaskStatus.InProgress, TaskStatus.Completed];

  /**
   * Temporary variable for the filteredTask
   */
  filteredTask = '';

  /**
   * ViewChild component for the MatPaginator
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /**
   * FormGroup for the filter
   */
  filterTaskForm: FormGroup = new FormGroup({
    search: new FormControl(null),
    tags: new FormControl(null),
    status: new FormControl(null),
  });

  errorMessage: string = '';

  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit(): void {
    // this.taskService.getTasks().subscribe({
    //   next: (tasks) => (this.dataSource = new MatTableDataSource<ITask>(tasks)),
    //   error: (err) => (this.errorMessage = err),
    // });
    this.dataSource = new MatTableDataSource<ITask>(this.TASK_DATA);

    // this.dataSource = [...this.TASK_DATA];
    this.taskService.getTasks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * opens the add dialog for the task
   */
  addDialog() {
    const dialog = this.dialog.open(AddTaskDialogComponent, {
      width: '40%',
      // data: { title: 'CREATE NEW', action: 'Create' },
    });
  }

  /**
   * opens the edit dialog for the task
   * @param row specific row of data on the selected task
   */
  editDialog(row: any) {
    const dialog = this.dialog.open(EditTaskDialogComponent, {
      width: '40%',
      data: row,
    });
  }

  /**
   * opens the delete dialog for the task
   * @param row specific row of data on the selected task
   */
  deleteDialog(row: any) {
    const dialog = this.dialog.open(DeleteTaskDialogComponent, {
      data: row,
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    // this.instructorService.getInstructors(this.postsPerPage, this.currentPage);
  }

  onFilter() {
    console.log(this.filterTaskForm.value);
    this.dataSource = [...this.TASK_DATA];
    if (
      (this.filterTaskForm.value.search === '' ||
        this.filterTaskForm.value.search === null) &&
      this.filterTaskForm.value.tags === null &&
      this.filterTaskForm.value.status === null
    ) {
    } else {
      this.dataSource = this.dataSource.filter((data: any) => {
        return JSON.stringify(data)
          .toLowerCase()
          .includes(
            this.filterTaskForm.value.search?.trim().toLowerCase() ||
              this.filterTaskForm.value.tags?.toLowerCase() ||
              this.filterTaskForm.value.status?.toLowerCase()
          );
      });
    }
  }

  onClearFilter() {
    this.filterTaskForm.controls['search'].setValue(null);
    this.filterTaskForm.controls['tags'].setValue(null);
    this.filterTaskForm.controls['status'].setValue(null);

    this.onFilter();
  }
}
