import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInviteNotificationComponent } from './team-invite-notification.component';

describe('TeamInviteNotificationComponent', () => {
  let component: TeamInviteNotificationComponent;
  let fixture: ComponentFixture<TeamInviteNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamInviteNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInviteNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
