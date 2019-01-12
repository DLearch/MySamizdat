import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config/app-config.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService {

  constructor(
    private config: AppConfigService
    , private http: HttpClient
  ) { }

  public change(data: any): Observable<any> {

    return this.http
      .post(this.getChangeUrl(), data)
      .pipe(
        catchError(response => this.handleChangeErrorResponse(response))
      );
  }

  private getChangeUrl(): string {

    return this.config.get('PathAPI') + 'change-password';
  }

  private handleChangeErrorResponse(data: any): any {

    console.log(data);
    return throwError(data);
  }
}
