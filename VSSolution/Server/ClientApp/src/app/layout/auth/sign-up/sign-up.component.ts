import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MyValidators } from 'src/app/MyValidators';
import { setErrors } from 'src/app/components/input/set-errors';
import { SignInService } from 'src/app/services/sign-in/sign-in.service';
import { DialogWindowService } from 'src/app/services/dialog-window/dialog-window.service';

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
    private auth: AuthService
    , private signIn: SignInService
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

      this.auth
        .register(this.mainForm.value)
        .subscribe(
          () => this.isComplete = true
        , response => {
          this.isWaiting = false;
          setErrors(response, this.mainForm);
        }
        );
    }
  }
}
