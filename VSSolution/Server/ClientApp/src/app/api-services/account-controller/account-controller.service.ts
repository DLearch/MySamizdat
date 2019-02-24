import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { GetInfoRVM } from './get-info-rvm';

@Injectable()
export class AccountControllerService {

  readonly controller: string = 'account';

  constructor(
    private api: ApiService
  ) { }

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

  changeAvatar(avatar: File): Observable<void> {

    let model = {
      avatar: avatar
    };

    return this.api.post(model, this.controller, 'changeavatar');
  }

  getInfo(): Observable<GetInfoRVM> {
    
    return this.api.post(null, this.controller, 'getinfo');
  }
}
