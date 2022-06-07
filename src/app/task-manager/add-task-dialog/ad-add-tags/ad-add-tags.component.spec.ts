import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdAddTagsComponent } from './ad-add-tags.component';

describe('AdAddTagsComponent', () => {
  let component: AdAddTagsComponent;
  let fixture: ComponentFixture<AdAddTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdAddTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdAddTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
