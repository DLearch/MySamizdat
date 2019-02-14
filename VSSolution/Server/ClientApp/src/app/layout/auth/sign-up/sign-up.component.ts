import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MyValidators } from 'src/app/MyValidators';
import { setErrors } from 'src/app/components/input/set-errors';
import { AuthDialogService } from 'src/app/services/auth-dialog/auth-dialog.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  public mainForm: FormGroup;
  public isComplete = false;

  public constructor(
    formBuilder: FormBuilder
    , private auth: AuthService
    , private authDialog: AuthDialogService
  ) {

    this.mainForm = formBuilder.group({

      'email': ['', [Validators.required, Validators.email]]
      , 'userName': ['', [Validators.required, MyValidators.userName]]
      , 'password': ['', [Validators.required, MyValidators.password]]
    });
  }

  public mainSubmit(): void {

    if (this.mainForm.valid)
      this.auth
        .register(this.mainForm.value)
        .subscribe(
          () => this.isComplete = true
          , response => setErrors(response, this.mainForm)
        );
  }
}
