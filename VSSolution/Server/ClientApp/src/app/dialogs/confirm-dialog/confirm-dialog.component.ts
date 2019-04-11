import { Component, OnInit, Inject } from '@angular/core';
import { dialogDataToken } from 'src/app/layout/dialog/dialog-data-token';
import { ConfirmDialogConfig } from './confirm-dialog-config';
import { DialogService } from 'src/app/layout/dialog/dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {


  constructor(
    @Inject(dialogDataToken) public config: ConfirmDialogConfig,
    private dialog: DialogService
  ) { console.log(config); }

  ngOnInit() {
  }

  ok() {
    this.dialog.close(true);
  }

  cancel() {
    this.dialog.close(false);
  }
}
