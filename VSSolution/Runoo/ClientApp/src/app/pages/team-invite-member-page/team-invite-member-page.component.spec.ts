import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInviteMemberPageComponent } from './team-invite-member-page.component';

describe('TeamInviteMemberPageComponent', () => {
  let component: TeamInviteMemberPageComponent;
  let fixture: ComponentFixture<TeamInviteMemberPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamInviteMemberPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInviteMemberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
