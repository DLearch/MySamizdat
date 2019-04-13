import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInviteMemberDialogComponent } from './team-invite-member-dialog.component';

describe('TeamInviteMemberDialogComponent', () => {
  let component: TeamInviteMemberDialogComponent;
  let fixture: ComponentFixture<TeamInviteMemberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamInviteMemberDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInviteMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
