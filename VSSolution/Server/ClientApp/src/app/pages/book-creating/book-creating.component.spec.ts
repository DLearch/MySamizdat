import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreatingComponent } from './book-creating.component';

describe('BookCreatingComponent', () => {
  let component: BookCreatingComponent;
  let fixture: ComponentFixture<BookCreatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCreatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
