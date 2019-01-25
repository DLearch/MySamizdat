import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { UserStorageService } from '../user-storage/user-storage.service';
import { map, tap } from 'rxjs/operators';


@Injectable()
export class AccountService {

  private readonly accountController: string = 'account';
  private readonly switchEmailVisibilityAction: string = 'switchemailvisibility';
  private readonly updateUserStorageAction: string = 'getuser';

  constructor(
    private api: ApiService
    , private userStorage: UserStorageService
  ) { }

  public switchEmailVisibility(data: { emailIsVisible: boolean }): void {

    this.api
      .post(data, this.accountController, this.switchEmailVisibilityAction)
      .subscribe(
        response => {
          this.userStorage.user.emailIsVisible = response.emailIsVisisble
        }
      );
  }

  public updateUserStorage(): Observable<any> {

    return this.api
      .post(null, this.accountController, this.updateUserStorageAction)
      .pipe(
        tap(response => this.userStorage.user = response.user)
      );
  }
}
