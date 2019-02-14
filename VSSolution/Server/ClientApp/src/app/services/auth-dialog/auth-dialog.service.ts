import { Injectable } from '@angular/core';
import { DialogWindowService } from '../dialog-window/dialog-window.service';
import { SignInComponent } from 'src/app/layout/auth/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/layout/auth/sign-up/sign-up.component';
import { EmailConfirmedComponent } from 'src/app/layout/auth/email-confirmed/email-confirmed.component';
import { EmailUnconfirmedComponent } from 'src/app/layout/auth/email-unconfirmed/email-unconfirmed.component';

@Injectable()
export class AuthDialogService {

  constructor(
    private dialogWindow: DialogWindowService
  ) { }

  openSignIn(): void {
    this.dialogWindow.open(SignInComponent, { closeButtonVisible: true, titleTK: 'pages.sign-in.name' });
  }

  openSignUp(): void {
    this.dialogWindow.open(SignUpComponent, { closeButtonVisible: true, titleTK: 'pages.sign-up.name' });
  }

  openEmailConfirmed(): void {
    this.dialogWindow.open(EmailConfirmedComponent, { closeButtonVisible: true });
  }

  openEmailUnconfirmed(): void {
    this.dialogWindow.open(EmailUnconfirmedComponent, { closeButtonVisible: true });
  }

  close(): void {
    this.dialogWindow.close();
  }
}
