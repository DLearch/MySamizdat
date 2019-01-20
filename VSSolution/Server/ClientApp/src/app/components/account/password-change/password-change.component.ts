import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordChangeService } from 'src/app/services/password-change/password-change.service';
import { AppConfigService } from 'src/app/services/app-config/app-config.service';
import { setErrorsFromResponse } from '../../forms/set-errors-from-response.func';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change'
  , templateUrl: './password-change.component.html'
  , styleUrls: ['./password-change.component.css']
  , providers: [PasswordChangeService]
})
export class PasswordChangeComponent {

  public mainForm: FormGroup;

  public constructor(
    formBuilder: FormBuilder
    , private passwordChangeService: PasswordChangeService
    , private router: Router
    , config: AppConfigService
  ) {

    this.mainForm = formBuilder.group({
    
      'oldPassword': ['', [Validators.required, Validators.pattern(config.get('PasswordPattern') as string)]]
      , 'newPassword': ['', [Validators.required, Validators.minLength(6), Validators.pattern(config.get('PasswordPattern') as string)]]
    });
  }

  public mainSubmit(): void {

    if (this.mainForm.valid)
      this.passwordChangeService
        .change(this.mainForm.value)
        .subscribe(
          () => this.router.navigate(['account'])
          , response => setErrorsFromResponse(response, this.mainForm)
        );
  }
}
