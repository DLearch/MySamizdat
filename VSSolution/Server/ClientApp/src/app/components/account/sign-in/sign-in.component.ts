import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config/app-config.service';
import { setErrorsFromResponse } from '../../forms/set-errors-from-response.func';

@Component({
  selector: 'app-sign-in'
  , templateUrl: './sign-in.component.html'
  , styleUrls: ['./sign-in.component.css']
  , providers: [AuthenticationService]
})
export class SignInComponent {

  public mainForm: FormGroup;

  public constructor(
    formBuilder: FormBuilder
    , private authenticationService: AuthenticationService
    , private router: Router
    , config: AppConfigService
  ) {

    this.mainForm = formBuilder.group({

      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern(config.get('PasswordPattern') as string)]]
    });
  }

  public mainSubmit(): void {

    if (this.mainForm.valid)
      this.authenticationService
        .authenticate(this.mainForm.value)
        .subscribe(
          () => this.router.navigate([''])
          , response => setErrorsFromResponse(response, this.mainForm)
        );
  }
}
