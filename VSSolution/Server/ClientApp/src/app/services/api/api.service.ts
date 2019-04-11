import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConfigurationService } from '../configuration/configuration.service';
import { UserStorageService } from '../user-storage/user-storage.service';

@Injectable()
export class ApiService {
  
  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService,
    private config: ConfigurationService
  ) { }

  public post(data: any, controller?: string, action?: string, id?:string): Observable<any> {
    
    return this.http
      .post(
        this.getUri(controller, action, id)
        , this.getJsonBody(data)
        , { headers: this.getHttpHeaders() }
      )
      .pipe(
        tap(response => this.handleResponse(response)),
        catchError(response => this.handleError(response))
      );
  }
  
  public postForm(data: any, controller?: string, action?: string): Observable<any> {

    let httpHeaders = new HttpHeaders();

    if (this.userStorageService.token)
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + this.userStorageService.token);
    
    return this.http
      .post(
        this.getUri(controller, action)
      , this.getFormBody(data)
      , { headers: httpHeaders }
      )
      .pipe(
        tap(response => this.handleResponse(response)),
        catchError(response => this.handleError(response))
      );
  }

  public getUri(controller?: string, action?: string, id?: string): string {

    let uri: string = this.config.getString('apiUrl');

    if (controller)
      uri += '/' + controller;

    if (action)
      uri += '/' + action;

    if (id)
      uri += '/' + id;

    return uri;
  }

  private getJsonBody(data: any): string {

    return JSON.stringify(data);
  }

  private getFormBody(data: any): FormData {

    var formData = new FormData();

    for (let key in data)
      formData.append(key, data[key]);

    return formData;
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


    if (data instanceof HttpErrorResponse) {

      if ((typeof data.error) == 'string' && (data.error as string).slice(0, 15) == '<!DOCTYPE html>')
        document.body.innerHTML = data.error;
      
      switch (data.status) {
        case 400:
          return throwError(data.error);
      }
    }


    return throwError(data);
  }
}
