import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { UserStorageService } from 'src/app/auth/user-storage.service';
import { AuthenticateVM } from 'src/app/auth/api-auth/authenticate-vm';
import { ConfirmEmailVM } from 'src/app/auth/api-auth/confirm-email-vm';
import { RegisterVM } from 'src/app/auth/api-auth/register-vm';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiAuthService {

  private readonly controller: string = 'auth';

  constructor(
    private api: ApiService,
    private userStorage: UserStorageService
  ) { }

  authenticate(model: AuthenticateVM): Observable<void> {

    return this.api
      .post(model, this.controller, 'gettoken')
      .pipe(tap(response => this.fillUserStorage(response)));
  }
  
  register(model: RegisterVM): Observable<void> {

    return this.api
      .post(model, this.controller, 'register');
  }

  confirmEmail(model: ConfirmEmailVM): Observable<void> {

    return this.api
      .post(model, this.controller, 'confirmemail')
      .pipe(tap(response => this.fillUserStorage(response)));
  }

  private fillUserStorage(data: any) {

    this.userStorage.userName = data.userName;
    this.userStorage.token = data.token;
  }
}
