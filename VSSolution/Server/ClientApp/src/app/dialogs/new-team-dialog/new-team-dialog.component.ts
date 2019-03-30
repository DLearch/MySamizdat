import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/layout/dialog/dialog.service';

@Component({
  selector: 'app-new-team-dialog',
  templateUrl: './new-team-dialog.component.html',
  styleUrls: ['./new-team-dialog.component.css']
})
export class NewTeamDialogComponent implements OnInit {

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