import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStorageService } from '../services/user-storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(
    private userStorage: UserStorageService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.userStorage.isEmpty()) {
      this.router.navigate(['sign-in']);
      return false;
    }

    return true;
  }
}
