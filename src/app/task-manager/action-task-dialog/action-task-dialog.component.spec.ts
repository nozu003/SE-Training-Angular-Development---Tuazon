import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTaskDialogComponent } from './action-task-dialog.component';

describe('ActionTaskDialogComponent', () => {
  let component: ActionTaskDialogComponent;
  let fixture: ComponentFixture<ActionTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionTaskDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
