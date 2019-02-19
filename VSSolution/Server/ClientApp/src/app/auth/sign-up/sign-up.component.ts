import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from 'src/app/MyValidators';
import { ApiAuthService } from '../api-auth/api-auth.service';
import { setErrors } from 'src/app/components/input/set-errors';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  public mainForm: FormGroup;
  public isComplete = false;
  isWaiting: boolean = false;

  public constructor(
    formBuilder: FormBuilder,
    private apiAuth: ApiAuthService
  ) {

    this.mainForm = formBuilder.group({

      'email': ['', [Validators.required, Validators.email]]
      , 'userName': ['', [Validators.required, MyValidators.userName]]
      , 'password': ['', [Validators.required, MyValidators.password]]
    });
  }

  public mainSubmit(): void {

    if (this.mainForm.valid) {
      this.isWaiting = true;

      this.apiAuth
        .register(this.mainForm.value)
        .subscribe(
          () => {
            this.isComplete = true;
            this.isWaiting = false;
          }
          , response => {
            this.isWaiting = false;
            setErrors(response, this.mainForm);
          }
        );
    }
  }
}
