import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppConfigService } from '../app-config/app-config.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserStorageService } from '../user-storage/user-storage.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
    , private config: AppConfigService
    , private userStorage: UserStorageService
  ) { }

  public post(data: any, controller: string, action?: string): Observable<any> {

    return this.http
      .post(
        this.getUri(controller, action)
        , this.getBody(data)
        , { headers: this.getHttpHeaders() }
      )
      .pipe(
        map(response => this.handlePostResponse(response)),
        catchError(response => this.handlePostErrorResponse(response))
      );
  }

  public getUri(controller: string, action?: string): string {

    let uri: string = this.config.get('PathAPI') + controller;

    if (action)
      uri += '/' + action;

    return uri;
  }

  private getBody(data: any): string {

    return JSON.stringify(data);
  }

  private getHttpHeaders(): HttpHeaders {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    if (!this.userStorage.isEmpty())
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + this.userStorage.token);

    return httpHeaders;
  }

  private handlePostResponse(data: any): any {

    console.log(data);

    return data;
  }

  private handlePostErrorResponse(data: any): any {

    console.log(data);

    if (data instanceof HttpErrorResponse)
      return throwError(data.error);

    return throwError(data);
  }
}
