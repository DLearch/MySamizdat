import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/layout/dialog/dialog.service';

@Component({
  selector: 'app-change-book-team-dialog',
  templateUrl: './change-book-team-dialog.component.html',
  styleUrls: ['./change-book-team-dialog.component.css']
})
export class ChangeBookTeamDialogComponent implements OnInit {

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
