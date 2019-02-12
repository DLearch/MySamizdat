import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStorageService } from '../user-storage/user-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

  isAuthenticated: boolean = false;

  constructor(
    private userStorage: UserStorageService
    , private router: Router,
  ) {

    this.updateAuthentication();
    
    window.addEventListener("storage", () => this.updateAuthentication());
  }

  updateAuthentication(): void {
    this.isAuthenticated = this.userStorage.token != null;
    
    if (this.router.url === '/create-book')
      this.router.navigate(['']);
  }

  canActivate(
    next: ActivatedRouteSnapshot
    , state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    return this.isAuthenticated;
  }


}
