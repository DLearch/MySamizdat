import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCreatingComponent } from './team-creating.component';

describe('TeamCreatingComponent', () => {
  let component: TeamCreatingComponent;
  let fixture: ComponentFixture<TeamCreatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCreatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
