import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUserApiResponse } from './get-user-api-response';
import { ApiService } from '../api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UserControllerService {

  readonly controller: string = 'user';

  constructor(
    private api: ApiService
  ) { }

  get(userName: string): Observable<GetUserApiResponse> {
    
    return this.api.post(null, this.controller, 'get', userName);
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

  changeAvatar(avatar: File): Observable<string> {

    let model = {
      avatar: avatar
    };

    return this.api.postForm(model, this.controller, 'changeavatar').pipe(map(response => response.avatarPath));
  }
}
