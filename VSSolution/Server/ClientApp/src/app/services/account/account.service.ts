import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { RegisterVM } from './register-vm';
import { ConfirmEmailVM } from './confirm-email-vm';
import { ChangePasswordVM } from './change-password-vm';
import { User } from 'src/app/models/user';
import { AuthenticateVM } from './authenticate-vm';
import { tap } from 'rxjs/operators';

@Injectable()
export class AccountService {

  private readonly controller: string = 'account';

  storage: Storage;
  isAuthenticated: boolean = false;
  user: User = null;
  private readonly tokenKey: string = 'jsonwebtoken';

  constructor(
    private api: ApiService
  ) {

    this.storage = window.localStorage;

    window.addEventListener("storage", () => this.isAuthenticated = this.storage['token']);
  }

  get token(): any {

    if (!this.storage[this.tokenKey])
      return null;

    return this.storage[this.tokenKey];
  }

  set token(value: any) {

    if (value) {

      this.isAuthenticated = true;
      this.storage.setItem(this.tokenKey, value);
    }
    else {

      this.storage.removeItem(this.tokenKey);
      this.user = null;
      this.isAuthenticated = false;
    }
  }

  register(model: RegisterVM): Observable<any> {

    return this.api
      .post(model, this.controller, 'register');
  }

  authenticate(model: AuthenticateVM): Observable<any> {

    return this.api
      .post(model, this.controller, 'gettoken')
      .pipe(tap(response => {
        this.token = response.token;
        this.user = new User();
        this.user.userName = response.userName;
      }));
  }

  sendEmailConfirmationMessage(): Observable<any> {

    return this.api
      .post(null, this.controller, 'sendemailconfirmationmessage');
  }

  confirmEmail(model: ConfirmEmailVM): Observable<any> {

    return this.api
      .post(model, this.controller, 'confirmemail');
  }

  getUser(): Observable<any> {

    return this.api
      .post(null, this.controller, 'getuser');
  }

  switchEmailVisibility(state: boolean): Observable<any> {

    return this.api
      .post({ emailIsVisible: state }, this.controller, 'switchemailvisibility');
  }

  changePassword(model: ChangePasswordVM): Observable<any> {

    return this.api
      .post(model, this.controller, 'changepassword');
  }
}
