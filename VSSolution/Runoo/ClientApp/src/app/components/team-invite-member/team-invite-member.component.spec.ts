import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInviteMemberComponent } from './team-invite-member.component';

describe('TeamInviteMemberComponent', () => {
  let component: TeamInviteMemberComponent;
  let fixture: ComponentFixture<TeamInviteMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamInviteMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInviteMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
