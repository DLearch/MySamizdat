import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteTeamMemberDialogComponent } from './invite-team-member-dialog.component';

describe('InviteTeamMemberDialogComponent', () => {
  let component: InviteTeamMemberDialogComponent;
  let fixture: ComponentFixture<InviteTeamMemberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteTeamMemberDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteTeamMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
