import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCreatingComponent } from './comment-creating.component';

describe('CommentCreatingComponent', () => {
  let component: CommentCreatingComponent;
  let fixture: ComponentFixture<CommentCreatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentCreatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
