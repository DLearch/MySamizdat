import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { UserStorageService } from '../user-storage/user-storage.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: "root"})
export class EmailConfirmationService {

  private readonly emailConfirmationController: string = 'emailconfirmation';
  private readonly confirmAction: string = 'confirm';
  private readonly sendAction: string = 'sendconfirmationmessage';


  constructor(
    private api: ApiService
    , private userStorage: UserStorageService
  ) {

  }

  public send(): Observable<any> {

    return this.api
      .post(null, this.emailConfirmationController, this.sendAction);
  }

  public confirm(data: any): Observable<any> {

    return this.api
      .post(data, this.emailConfirmationController, this.confirmAction)
      .pipe(
        tap(response => {

        
          this.userStorage.token = response.token;
          this.userStorage.user = response.user;
        })
      );
  }
}
