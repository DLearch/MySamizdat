import { Component } from '@angular/core';
import { DialogService } from 'src/app/layout/dialog/dialog.service';
import { SignInDialogComponent } from 'src/app/dialogs/sign-in-dialog/sign-in-dialog.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  constructor(private dialogService: DialogService) { }

  open() {
    this.dialogService.open(SignInDialogComponent);
  }
}
