import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBooksPageComponent } from './team-books-page.component';

describe('TeamBooksPageComponent', () => {
  let component: TeamBooksPageComponent;
  let fixture: ComponentFixture<TeamBooksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamBooksPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamBooksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
