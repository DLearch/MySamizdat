import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { UserStorageService } from 'src/app/auth/user-storage.service';
import { AuthenticateVM } from 'src/app/auth/api-auth/authenticate-vm';
import { ConfirmEmailVM } from 'src/app/auth/api-auth/confirm-email-vm';
import { RegisterVM } from 'src/app/auth/api-auth/register-vm';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthControllerService } from 'src/app/api-services/auth-controller/auth-controller.service';

@Injectable()
export class ApiAuthService {
  
  constructor(
    private authController: AuthControllerService,
    private userStorage: UserStorageService
  ) { }

  authenticate(model: AuthenticateVM): Observable<void> {

    return this.authController
      .getToken(model.email, model.password)
      .pipe(map(response => this.fillUserStorage(response)));
  }
  
  register(model: RegisterVM): Observable<void> {

    return this.authController
      .register(model.userName, model.email, model.password);
  }

  confirmEmail(model: ConfirmEmailVM): Observable<void> {

    return this.authController
      .confirmEmail(model.email, model.token)
      .pipe(map(response => this.fillUserStorage(response)));
  }

  private fillUserStorage(data: any) {

    this.userStorage.userName = data.userName;
    this.userStorage.token = data.token;
  }
}
