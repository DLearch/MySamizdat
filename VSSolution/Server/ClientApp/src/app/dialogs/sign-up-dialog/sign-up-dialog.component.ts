import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/layout/dialog/dialog.service';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.css']
})
export class SignUpDialogComponent implements OnInit {

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
