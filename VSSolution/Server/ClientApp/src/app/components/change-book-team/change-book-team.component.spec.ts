import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBookTeamComponent } from './change-book-team.component';

describe('ChangeBookTeamComponent', () => {
  let component: ChangeBookTeamComponent;
  let fixture: ComponentFixture<ChangeBookTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeBookTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBookTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
