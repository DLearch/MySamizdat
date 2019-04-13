import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { InputTemplate } from '../form/input-template';
import { AuthControllerService } from 'src/app/api/auth/auth-controller.service';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';
import { Validators, FormGroup } from '@angular/forms';
import { AppValidators } from 'src/app/app-validators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  componentTK = 'component.sign-in.';

  formTemplate: InputTemplate[];
  formErrors: any;

  @Output() load = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<boolean>();

  constructor(
    private authController: AuthControllerService,
    private userStorage: UserStorageService
  ) { }

  ngOnInit() {
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

  post(form: FormGroup) {

    if (form.valid) {
      this.load.emit(false);

      this.authController
        .login(form.value)
        .subscribe(response => {

          this.userStorage.signIn(response);
          
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
