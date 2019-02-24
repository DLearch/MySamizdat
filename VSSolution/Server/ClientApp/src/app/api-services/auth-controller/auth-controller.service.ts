import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { GetTokenRVM } from './get-token-rvm';
import { ConfirmEmailRVM } from './confirm-email-rvm';

@Injectable()
export class AuthControllerService {

  readonly controller: string = 'auth';

  constructor(
    private api: ApiService
  ) { }

  register(userName: string, email: string, password: string): Observable<void> {

    let model = {
      userName: userName,
      email: email,
      password: password
    };

    return this.api.post(model, this.controller, 'register');
  }

  sendEmailConfirmationMessage(): Observable<void> {
    
    return this.api.post(null, this.controller, 'sendemailconfirmationmessage');
  }

  getToken(email: string, password: string): Observable<GetTokenRVM> {

    let model = {
      email: email,
      password: password
    };

    return this.api.post(model, this.controller, 'gettoken');
  }

  confirmEmail(email: string, token: string): Observable<ConfirmEmailRVM> {

    let model = {
      email: email,
      token: token
    };

    return this.api.post(model, this.controller, 'confirmemail');
  }
}
