import { Injectable } from '@angular/core';
import { DialogWindowService } from '../dialog-window/dialog-window.service';
import { SignInComponent } from 'src/app/layout/auth/sign-in/sign-in.component';

@Injectable()
export class SignInService {

  constructor(
    private dialogWindow: DialogWindowService
  ) { }

  open(): void {
    this.dialogWindow.open(SignInComponent, { closeButtonVisible: true, titleTK: 'pages.sign-in.name' });
  }
}
