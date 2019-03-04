import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthControllerService } from 'src/app/api-services/auth-controller/auth-controller.service';
import { MatSnackBar } from '@angular/material';
import { DialogWindowService } from 'src/app/layout/dialog-window/dialog-window.service';
import { AppValidators } from 'src/app/app-validators';
import { FormComponent } from 'src/app/components/form/form.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @ViewChild('form') formComponent: FormComponent;

  isWaiting: boolean = false;

  public constructor(
    private dialog: DialogWindowService,
    private snackBar: MatSnackBar,
    private authController: AuthControllerService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.formComponent.template = [
      {
        name: 'email',
        tk: 'email',
        type: 'email',
        validators: [Validators.required, Validators.email]
      },
      {
        name: 'userName',
        tk: 'username',
        validators: [Validators.required, AppValidators.userName]
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
        .register(this.formComponent.form.value.userName, this.formComponent.form.value.email, this.formComponent.form.value.password)
        .subscribe(
          () => {

            this.snackBar.open(
              this.translate.instant('email-confirmation-message-sent'),
              this.translate.instant('action.ok')
            );
            this.dialog.close();
          },
          response => {
            this.isWaiting = false;

            this.formComponent.errors = response;
          }
        );
    }
  }
}
