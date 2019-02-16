import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MyValidators } from 'src/app/MyValidators';
import { setErrors } from 'src/app/components/input/set-errors';
import { SignUpService } from 'src/app/services/sign-up/sign-up.service';
import { DialogWindowService } from 'src/app/services/dialog-window/dialog-window.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  public mainForm: FormGroup;
  isWaiting: boolean = false;

  public constructor(
    formBuilder: FormBuilder
    , private auth: AuthService
    , public signUp: SignUpService
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

      this.auth
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
