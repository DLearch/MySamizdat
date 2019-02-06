import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStorageService } from '../user-storage/user-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

  isAuthenticated: boolean = false;

  constructor(
    private userStorage: UserStorageService
  ) {

    this.updateAuthentication();

    window.addEventListener("storage", () => this.updateAuthentication());
  }

  updateAuthentication(): void {
    this.isAuthenticated = this.userStorage.token != null;
  }

  canActivate(
    next: ActivatedRouteSnapshot
    , state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated;
  }


}
