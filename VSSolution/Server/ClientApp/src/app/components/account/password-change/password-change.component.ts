import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordChangeService } from 'src/app/services/password-change/password-change.service';

@Component({
  selector: 'app-password-change'
  , templateUrl: './password-change.component.html'
  , styleUrls: ['./password-change.component.css']
  , providers: [PasswordChangeService]
})
export class PasswordChangeComponent {

  public passwordChangeForm: FormGroup;

  public constructor(
    formBuilder: FormBuilder
    , private passwordChangeService: PasswordChangeService
  ) {

    this.passwordChangeForm = formBuilder.group({
    
      'oldPassword': ['', [Validators.required]]
      , 'newPassword': ['', [Validators.required]]
    });
  }

  public change(): void {

    this.passwordChangeService
      .change(this.passwordChangeForm.value);
  }
}
