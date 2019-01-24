import { Component } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { setErrorsFromResponse } from '../../forms/set-errors-from-response.func';
import { AppConfigService } from 'src/app/services/app-config/app-config.service';

@Component({
  selector: 'app-sign-up'
  , templateUrl: './sign-up.component.html'
  , styleUrls: ['./sign-up.component.css']
  , providers: [RegistrationService]
})
export class SignUpComponent {

  public mainForm: FormGroup;
  public isComplete = false;
  
  public constructor(
    formBuilder: FormBuilder
    , private registrationService: RegistrationService
    , config: AppConfigService
  ) {

    this.mainForm = formBuilder.group({

      'email': ['', [Validators.required, Validators.email]],
      'name': ['', [Validators.required]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.pattern(config.get('PasswordPattern') as string)]]
    });
  }

  public mainSubmit(): void {

    //if (this.mainForm.valid)
      this.registrationService
        .register(this.mainForm.value)
        .subscribe(
          () => this.isComplete = true
          , response => setErrorsFromResponse(response, this.mainForm)
        );
  }
}
