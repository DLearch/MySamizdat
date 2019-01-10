import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AuthenticationService]
})
export class SignInComponent implements OnInit {

  public signInForm: FormGroup;

  public constructor(
    formBuilder: FormBuilder
    , private authenticationService: AuthenticationService
    , private router: Router
  ) {

    this.signInForm = formBuilder.group({

      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  ngOnInit() { }

  public authenticate(): void {

    this.authenticationService
      .authenticate(this.signInForm.value)
      .subscribe(
        () => this.handleSignInResponse(),
        (data) => this.handleSignInErrorResponse(data)
      );
  }

  private handleSignInResponse(): void {

    this.router.navigate(['']);
  }

  private handleSignInErrorResponse(data: any): void { }
}
