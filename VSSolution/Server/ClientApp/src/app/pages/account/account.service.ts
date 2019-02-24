import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserStorageService } from 'src/app/auth/user-storage.service';

@Injectable()
export class AccountService {

  readonly controller: string = 'account';

  constructor(
    private api: ApiService
    , private userStorage: UserStorageService
  ) {


    if (this.userStorage.token && !this.userStorage.user)
      this.updateInfo().subscribe();
  }

  updateInfo(): Observable<void> {

    return this.api
      .post(null, this.controller, 'getuser')
      .pipe(tap(response => this.userStorage.user = response.user));
  }

  changeEmailVisibility(state: boolean): Observable<void> {

    return this.api
      .post({ emailIsVisible: state }, this.controller, 'changeemailvisibility')
      .pipe(tap(() => this.userStorage.user.emailIsVisible = state));
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {

    const model: any = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    return this.api
      .post(model, this.controller, 'changepassword');
  }

  changeAvatar(image: File): Observable<void> {

    return this.api
      .postForm({ avatar: image }, this.controller, 'changeavatar')
      .pipe(tap(response => this.userStorage.user.avatarPath = response.avatarPath));
  }
}
