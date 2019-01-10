import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [RegistrationService]
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;
  public isComplete = false;
  
  public constructor(
    formBuilder: FormBuilder
    , private registrationService: RegistrationService
  ) {

    this.signUpForm = formBuilder.group({

      'email': ['', [Validators.required, Validators.email]],
      'name': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  ngOnInit() { }

  public register(): void {

    this.registrationService
      .register(this.signUpForm.value)
      .subscribe(
        () => this.handleSignUpResponse(),
        (data) => this.handleSignUpErrorResponse(data)
      );
  }

  private handleSignUpResponse(): void {
    
    this.isComplete = true;
  }

  private handleSignUpErrorResponse(data: any): void { }
}
