import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { GetUserRVM } from './get-user-rvm';

@Injectable()
export class UserControllerService {

  readonly controller: string = 'user';

  constructor(
    private api: ApiService
  ) { }

  getUser(userName: string): Observable<GetUserRVM> {

    let model = {
      userName: userName
    };

    return this.api.post(model, this.controller, 'getuser');
  }

  changeEmailVisibility(visible: boolean): Observable<void> {

    let model = {
      visible: visible
    };

    return this.api.post(model, this.controller, 'changeemailvisibility');
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {

    let model = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    return this.api.post(model, this.controller, 'changepassword');
  }
}
