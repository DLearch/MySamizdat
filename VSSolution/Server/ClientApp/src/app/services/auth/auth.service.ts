import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable, empty } from 'rxjs';
import { RegisterVM } from './register-vm';
import { AuthenticateVM } from './authenticate-vm';
import { tap, map } from 'rxjs/operators';
import { UserStorageService } from '../user-storage/user-storage.service';
import { MatBottomSheet } from '@angular/material';
import { SignInComponent } from 'src/app/layout/auth/sign-in/sign-in.component';
import { AuthGuard } from '../auth-guard/auth.guard';
import { ConfirmEmailVM } from './confirm-email-vm';

@Injectable()
export class AuthService {

  private readonly controller: string = 'account';
  
  constructor(
    private api: ApiService
    , private userStorage: UserStorageService
    , private authGuard: AuthGuard
  ) { }
  
  register(model: RegisterVM): Observable<void> {

    return this.api
      .post(model, this.controller, 'register');
  }

  authenticate(model: AuthenticateVM): Observable<void> {

    return this.api
      .post(model, this.controller, 'gettoken')
      .pipe(tap(response => {
        this.userStorage.userName = response.userName;
        this.userStorage.token = response.token;
        this.authGuard.updateAuthentication();
      })); 
  }

  unauthenticate(): void {

    this.userStorage.token = null;
    this.authGuard.updateAuthentication();
  }

  confirmEmail(model: ConfirmEmailVM): Observable<void> {

    return this.api
      .post(model, this.controller, 'confirmemail')
      .pipe(tap(response => {
        this.userStorage.userName = response.userName;
        this.userStorage.token = response.token;
        this.authGuard.updateAuthentication();
      }));
  }
}
