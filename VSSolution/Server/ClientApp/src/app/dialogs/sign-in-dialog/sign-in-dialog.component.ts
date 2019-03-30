import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/layout/dialog/dialog.service';

@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.css']
})
export class SignInDialogComponent implements OnInit {

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
