import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InputTemplate } from '../form/input-template';
import { AuthControllerService } from 'src/app/api/auth/auth-controller.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, Validators } from '@angular/forms';
import { AppValidators } from 'src/app/app-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  componentTK = 'component.sign-up.';

  formTemplate: InputTemplate[];
  formErrors: any;

  @Output() load = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<boolean>();

  public constructor(
    private snackBar: MatSnackBar,
    private authController: AuthControllerService,
    private translate: TranslateService
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

  post(form: FormGroup) {

    if (form.valid) {
      this.load.emit(false);

      this.authController
        .register(form.value)
        .subscribe(() => {

          this.snackBar.open(
            this.translate.instant(this.componentTK + 'sent'),
            this.translate.instant(this.componentTK + 'ok')
          );
          this.load.emit(true);
          this.submit.emit(true);
        },
          response => {
            this.formErrors = response;
            this.load.emit(true);
            this.submit.emit(false);
          }
        );
    }
    else for (let control in form.controls)
      form.controls[control].markAsTouched();
  }
}
