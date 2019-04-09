import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBooksPageComponent } from './user-books-page.component';

describe('UserBooksPageComponent', () => {
  let component: UserBooksPageComponent;
  let fixture: ComponentFixture<UserBooksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBooksPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBooksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
