import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStorageService } from '../services/user-storage/user-storage.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(
    private userStorage: UserStorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (!this.userStorage.isEmpty()) {
      req.headers.append('Authorization', 'Bearer ' + this.userStorage.token);
    }

    return next.handle(req);
  }
}
