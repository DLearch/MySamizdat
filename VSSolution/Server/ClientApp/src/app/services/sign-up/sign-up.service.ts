import { Injectable } from '@angular/core';
import { DialogWindowService } from '../dialog-window/dialog-window.service';
import { SignUpComponent } from 'src/app/layout/auth/sign-up/sign-up.component';

@Injectable()
export class SignUpService {

  constructor(
    private dialogWindow: DialogWindowService
  ) { }

  open(): void {
    this.dialogWindow.open(SignUpComponent);
  }
}
