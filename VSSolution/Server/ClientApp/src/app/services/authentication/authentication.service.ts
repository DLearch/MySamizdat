import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserStorageService } from '../user-storage/user-storage.service';
import { AppConfigService } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private config: AppConfigService
    , private userStorage: UserStorageService
    , private http: HttpClient
  ) {
    userStorage.unsetUser();
  }

  public authenticate(user: any): Observable<any> {

    return this.http
      .post(this.getAuthenticateUrl(), user)
      .pipe(
      map(response => this.handleAuthenticateResponse(response)),
        catchError(response => this.handleAuthenticateErrorResponse(response))
      );
  }

  private getAuthenticateUrl(): string {

    return this.config.get('PathAPI') + 'authentication';
  }

  private handleAuthenticateResponse(data: any): void {

    this.userStorage.setUser(data.name, data.token);
  }

  private handleAuthenticateErrorResponse(data: any): any {

    console.log(data);
    return throwError(data);
  }
}
