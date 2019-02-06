import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from 'src/app/MyValidators';
import { setErrors } from 'src/app/components/input/set-errors';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material';
import { SignInComponent } from '../sign-in/sign-in.component';

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
    , private bottomSheetRef: MatBottomSheetRef<SignUpComponent>
    , private bottomSheet: MatBottomSheet
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

  openSignIn(): void {

    this.bottomSheet.open(SignInComponent);
  }

  close(): void {

    this.bottomSheetRef.dismiss();
  }
}
