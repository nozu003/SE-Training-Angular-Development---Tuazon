import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdEditTagsComponent } from './ed-edit-tags.component';

describe('EdEditTagsComponent', () => {
  let component: EdEditTagsComponent;
  let fixture: ComponentFixture<EdEditTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdEditTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdEditTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
