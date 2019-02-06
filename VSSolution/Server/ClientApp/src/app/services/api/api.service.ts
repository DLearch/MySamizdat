import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserStorageService } from '../user-storage/user-storage.service';

@Injectable()
export class ApiService {

  readonly apiPath: string = 'https://localhost:44314/api';
  constructor(
    private http: HttpClient
    , private userStorageService: UserStorageService
  ) { }

  public post(data: any, controller?: string, action?: string): Observable<any> {

    return this.http
      .post(
        this.getUri(controller, action)
        , this.getBody(data)
        , { headers: this.getHttpHeaders() }
      )
      .pipe(
        tap(response => this.handleResponse(response)),
        catchError(response => this.handleError(response))
      );
  }

  public getUri(controller?: string, action?: string): string {

    let uri: string = this.apiPath;

    if (controller)
      uri += '/' + controller;

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

    if (this.userStorageService.token)
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + this.userStorageService.token);

    return httpHeaders;
  }

  private handleResponse(data: any): any {

    console.log("API response:");
    console.log(data);

    return data;
  }

  private handleError(data: any): any {

    console.log("API error:");
    console.log(data);

    if (data instanceof HttpErrorResponse)
      switch (data.status) {
        case 400:
          return throwError(data.error);
      }

    return throwError(data);
  }
}
