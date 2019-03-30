import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteTeamMemberPageComponent } from './invite-team-member-page.component';

describe('InviteTeamMemberPageComponent', () => {
  let component: InviteTeamMemberPageComponent;
  let fixture: ComponentFixture<InviteTeamMemberPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteTeamMemberPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteTeamMemberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
