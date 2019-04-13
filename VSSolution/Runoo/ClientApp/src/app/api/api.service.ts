import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public post(data: any, controller?: string, action?: string, id?: string): Observable<any> {

    return this.http
      .post(
        this.getUri(controller, action, id)
      , this.getJsonBody(data)
      , { headers: this.getJsonHttpHeaders() } //, observe: 'response'
      )
      .pipe(
        tap(response => this.handleResponse(response)),
        catchError(response => this.handleError(response))
      );
  }

  public postForm(data: any, controller?: string, action?: string, id?: string): Observable<any> {
    
    return this.http
      .post(
        this.getUri(controller, action, id)
        , this.getFormBody(data)
      )
      .pipe(
        tap(response => this.handleResponse(response)),
        catchError(response => this.handleError(response))
      );
  }

  public getUri(controller?: string, action?: string, id?: string): string {

    let uri: string = '/api';

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

  private getJsonHttpHeaders(): HttpHeaders {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
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
