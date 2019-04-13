import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { LoginApiResponse } from './login-api-response';

@Injectable()
export class AuthControllerService {

  readonly controller: string = 'auth';

  constructor(
    private api: ApiService
  ) { }

  register(model: { userName: string, email: string, password: string }): Observable<void> {

    return this.api.post(model, this.controller, 'register');
  }

  sendEmailConfirmationMessage(): Observable<void> {

    return this.api.post(null, this.controller, 'sendemailconfirmationmessage');
  }

  login(model: { email: string, password: string }): Observable<LoginApiResponse> {
    
    return this.api.post(model, this.controller, 'login');
  }

  confirmEmail(email: string, token: string): Observable<LoginApiResponse> {

    let model = {
      email: email,
      token: token
    };

    return this.api.post(model, this.controller, 'confirmemail');
  }
}
