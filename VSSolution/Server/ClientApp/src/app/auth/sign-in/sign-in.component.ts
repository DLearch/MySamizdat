import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogWindowService } from 'src/app/layout/dialog-window/dialog-window.service';
import { MyValidators } from 'src/app/MyValidators';
import { AuthService } from '../auth.service';
import { ApiAuthService } from '../api-auth/api-auth.service';
import { setErrors } from 'src/app/components/input/set-errors';

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
    private apiAuth: ApiAuthService
    , private dialog: DialogWindowService
  ) {

    this.mainForm = formBuilder.group({

      'email': ['', [Validators.required, Validators.email]]
      , 'password': ['', [Validators.required, MyValidators.password]]
    });
  }

  public mainSubmit(): void {

    if (this.mainForm.valid) {
      this.isWaiting = true;

      this.apiAuth
        .authenticate(this.mainForm.value)
        .subscribe(
          () => this.dialog.close(),
          response => {
            this.isWaiting = false;
            setErrors(response, this.mainForm);
          }
        );
    }
  }
}
