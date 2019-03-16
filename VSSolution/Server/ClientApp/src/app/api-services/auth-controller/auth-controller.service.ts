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

  register(model: { userName: string, email: string, password: string }): Observable<void> {
    
    return this.api.post(model, this.controller, 'register');
  }

  sendEmailConfirmationMessage(): Observable<void> {
    
    return this.api.post(null, this.controller, 'sendemailconfirmationmessage');
  }

  getToken(model: { email: string, password: string }): Observable<GetTokenRVM> {
    

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
