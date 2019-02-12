import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MyValidators } from 'src/app/MyValidators';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material';
import { setErrors } from 'src/app/components/input/set-errors';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  public mainForm: FormGroup;

  public constructor(
    formBuilder: FormBuilder
    , private auth: AuthService
    //, private bottomSheet: MatBottomSheet
    //, private bottomSheetRef?: MatBottomSheetRef<SignInComponent>
  ) {
    
    this.mainForm = formBuilder.group({

      'email': ['', [Validators.required, Validators.email]]
      , 'password': ['', [Validators.required, MyValidators.password]]
    });
  }

  public mainSubmit(): void {

    if (this.mainForm.valid)
      this.auth
        .authenticate(this.mainForm.value)
        .subscribe(
          () => this.close()
          , response => setErrors(response, this.mainForm)
        );
  }

  openSignUp(): void {

    //this.bottomSheet.open(SignUpComponent);
  }
  
  close(): void {

    //this.bottomSheetRef.dismiss();
  }
}
