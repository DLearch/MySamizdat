import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamControllerService } from 'src/app/api/team/team-controller.service';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';

@Component({
  selector: 'app-team-invite-notification',
  templateUrl: './team-invite-notification.component.html',
  styleUrls: ['./team-invite-notification.component.css']
})
export class TeamInviteNotificationComponent implements OnInit {

  componentTK = 'layout.notifications.team-invite-notification.';

  @Input() notification: {
    id: number,
    teamName: string,
    inviterName: string
  } = null;

  @Output() submit = new EventEmitter<boolean>();

  constructor(
    private teamController: TeamControllerService,
    private userStorage: UserStorageService
  ) { }

  ngOnInit() {
  }

  respond(accept: boolean) {

    if (this.notification) {
      this.teamController
        .respondInvitation(this.notification.teamName, accept)
        .subscribe(() => {

          if (accept) {
            this.userStorage.teams.push({ teamName: this.notification.teamName, teamMemberRoleTK: 'member' });
          }
          this.submit.emit(accept)
        });
    }
  }
}
