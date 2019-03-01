import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogWindowService } from 'src/app/layout/dialog-window/dialog-window.service';
import { AuthService } from '../auth.service';
import { setErrors } from 'src/app/components/input/set-errors';
import { AuthControllerService } from 'src/app/api-services/auth-controller/auth-controller.service';
import { AppValidators } from 'src/app/app-validators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  public mainForm: FormGroup;
  isWaiting: boolean = false;

  public constructor(
    formBuilder: FormBuilder,
    private dialog: DialogWindowService,
    private authService: AuthService,
    private authController: AuthControllerService
  ) {

    this.mainForm = formBuilder.group({

      'email': ['', [Validators.required, Validators.email]]
      , 'password': ['', [Validators.required, AppValidators.password]]
    });
  }

  public mainSubmit(): void {

    if (this.mainForm.valid) {
      this.isWaiting = true;

      this.authController
        .getToken(this.mainForm.value.email, this.mainForm.value.password)
        .subscribe(
        response => {
          this.authService.signIn(response.userName, response.token);
          this.dialog.close();
        },
          response => {
            this.isWaiting = false;
            setErrors(response, this.mainForm);
          }
        );
    }
  }
}
