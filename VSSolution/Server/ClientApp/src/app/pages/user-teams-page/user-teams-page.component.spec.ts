import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTeamsPageComponent } from './user-teams-page.component';

describe('UserTeamsPageComponent', () => {
  let component: UserTeamsPageComponent;
  let fixture: ComponentFixture<UserTeamsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTeamsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTeamsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
