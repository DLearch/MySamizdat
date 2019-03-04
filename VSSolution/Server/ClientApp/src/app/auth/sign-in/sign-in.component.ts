import { Component, ViewChild, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DialogWindowService } from 'src/app/layout/dialog-window/dialog-window.service';
import { AuthService } from '../auth.service';
import { AuthControllerService } from 'src/app/api-services/auth-controller/auth-controller.service';
import { AppValidators } from 'src/app/app-validators';
import { FormComponent } from 'src/app/components/form/form.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @ViewChild('form') formComponent: FormComponent;
  
  isWaiting: boolean = false;
  formTemplate: any;
  formErrors: any;

  public constructor(
    private dialog: DialogWindowService,
    private authService: AuthService,
    private authController: AuthControllerService
  ) { }

  ngOnInit(): void {
    this.formTemplate = [
      {
        name: 'email',
        tk: 'email',
        type: 'email',
        validators: [Validators.required, Validators.email]
      },
      {
        name: 'password',
        tk: 'password',
        type: 'password',
        validators: [Validators.required, AppValidators.password]
      }
    ];
  }

  public submit(): void {

    if (this.formComponent.form.valid) {
      this.isWaiting = true;

      this.authController
        .getToken(this.formComponent.form.value.email, this.formComponent.form.value.password)
        .subscribe(
          response => {
            this.authService.signIn(response.userName, response.token);
            this.dialog.close();
          },
          response => {
            this.isWaiting = false;

            this.formErrors = response;
          }
        );
    }
  }
}
