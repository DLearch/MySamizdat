import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../user-storage/user-storage.service';
import { map } from 'rxjs/operators';
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
    userStorage.unsetUser();
  }

  public authenticate(data: any): Observable<any> {

    return this.api
      .post(data, this.authenticateController)
      .pipe(map(response => this.handleAuthenticateResponse(response)));
  }

  private handleAuthenticateResponse(data: any): void {

    this.userStorage.setUser(data.name, data.token);
  }
}
