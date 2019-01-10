import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config/app-config.service';
import { UserStorageService } from '../user-storage/user-storage.service';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private config: AppConfigService
    , userStorage: UserStorageService
    , private http: HttpClient
  ) {
    userStorage.unsetUser();
  }

  public register(user: any): Observable<any> {

    return this.http
      .post(this.getRegisterUrl(), user)
      .pipe(
        map(() => this.handleRegisterResponse()),
        catchError(response => this.handleRegisterErrorResponse(response))
      );
  }

  private getRegisterUrl(): string {

    return this.config.get('PathAPI') + 'registration';
  }

  private handleRegisterResponse(): void { }

  private handleRegisterErrorResponse(data: any): any {

    return throwError(data);
  }
}
