import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { setErrors } from 'src/app/components/input/set-errors';
import { AuthControllerService } from 'src/app/api-services/auth-controller/auth-controller.service';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { DialogWindowService } from 'src/app/layout/dialog-window/dialog-window.service';
import { AppValidators } from 'src/app/app-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  public mainForm: FormGroup;
  isWaiting: boolean = false;

  public constructor(
    formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authController: AuthControllerService,
    private dialogWindow: DialogWindowService
  ) {

    this.mainForm = formBuilder.group({

      'email': ['', [Validators.required, Validators.email]]
      , 'userName': ['', [Validators.required, AppValidators.userName]]
      , 'password': ['', [Validators.required, AppValidators.password]]
    });
  }

  public mainSubmit(): void {

    if (this.mainForm.valid) {
      this.isWaiting = true;

      this.authController
        .register(this.mainForm.value.userName, this.mainForm.value.email, this.mainForm.value.password)
        .subscribe(
          () => {
            this.dialogWindow.close();
            this.snackBar.open('Email confirmation message sent. Check your mailbox.', 'Ok');
          }
          , response => {
            this.isWaiting = false;
            setErrors(response, this.mainForm);
          }
        );
    }
  }
}
