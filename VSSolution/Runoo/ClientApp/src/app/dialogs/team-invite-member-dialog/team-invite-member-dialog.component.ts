import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/dialog/dialog.service';

@Component({
  selector: 'app-team-invite-member-dialog',
  templateUrl: './team-invite-member-dialog.component.html',
  styleUrls: ['./team-invite-member-dialog.component.css']
})
export class TeamInviteMemberDialogComponent implements OnInit {

  constructor(
    private dialogService: DialogService
  ) { }

  ngOnInit() {
  }

  onLoad(loaded: boolean) {
  }

  onSubmit(result: boolean) {

    if (result)
      this.dialogService.close();
  }
}
