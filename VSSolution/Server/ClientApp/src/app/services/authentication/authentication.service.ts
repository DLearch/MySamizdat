import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserStorageService } from '../user-storage/user-storage.service';
import { map, tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly authenticateController: string = 'authentication';

  constructor(
    private api: ApiService
    , private userStorage: UserStorageService
  ) {
    userStorage.token = null;
  }

  public authenticate(data: any): Observable<any> {

    return this.api
      .post(data, this.authenticateController)
      .pipe(
        tap(response => this.handleAuthenticateResponse(response))
      );
  }

  private handleAuthenticateResponse(data: any): void {

    this.userStorage.token = data.token;
    this.userStorage.user = data.user;
  }
}
