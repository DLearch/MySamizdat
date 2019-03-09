import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamControllerService } from 'src/app/api-services/team-controller/team-controller.service';

@Component({
  selector: 'app-team-invite-notification',
  templateUrl: './team-invite-notification.component.html',
  styleUrls: ['./team-invite-notification.component.css']
})
export class TeamInviteNotificationComponent implements OnInit {

  componentTK = 'component.team-invite-notification.';

  @Input() notification: {
    id: number,
    teamId: number
    teamName: string,
    inviterName: string
  } = null;
  @Output() onRespond = new EventEmitter<boolean>();

  constructor(
    private teamController: TeamControllerService
  ) { }

  ngOnInit() {
  }

  respond(accept: boolean) {

    if (this.notification)
      this.teamController
        .respondInvitation(this.notification.id, accept)
        .subscribe(() => this.onRespond.emit(accept));
  }
}
