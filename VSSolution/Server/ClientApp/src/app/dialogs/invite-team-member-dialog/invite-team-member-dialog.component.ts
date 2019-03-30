import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/layout/dialog/dialog.service';

@Component({
  selector: 'app-invite-team-member-dialog',
  templateUrl: './invite-team-member-dialog.component.html',
  styleUrls: ['./invite-team-member-dialog.component.css']
})
export class InviteTeamMemberDialogComponent implements OnInit {

  constructor(
    private dialogService: DialogService
  ) { }

  ngOnInit() {
  }

  onLoad(loaded: boolean) {
    //this.pageService.loaded = loaded;
  }

  onSubmit(result: boolean) {

    if (result)
      this.dialogService.close();
  }
}
