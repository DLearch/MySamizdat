import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTeamPageComponent } from './new-team-page.component';

describe('NewTeamPageComponent', () => {
  let component: NewTeamPageComponent;
  let fixture: ComponentFixture<NewTeamPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTeamPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
