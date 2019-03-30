import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChapterDialogComponent } from './new-chapter-dialog.component';

describe('NewChapterDialogComponent', () => {
  let component: NewChapterDialogComponent;
  let fixture: ComponentFixture<NewChapterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChapterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChapterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
