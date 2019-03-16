import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';
import { AuthControllerService } from 'src/app/api-services/auth-controller/auth-controller.service';
import { MatSnackBar } from '@angular/material';
import { map, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AuthGuard implements CanActivate {

  guardTK = 'guard.auth.';

  constructor(
    private userStorage: UserStorageService,
    private authController: AuthControllerService,
    private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (next.routeConfig.path === 'confirm-email') {

      this.signOutIfAuth();

      return this.confirmEmail(next);
    }

    if (next.routeConfig.path === 'sign-in') {

      this.signOutIfAuth();
      
      return true;
    }
    
    if (next.routeConfig.path === 'sign-up') {

      this.signOutIfAuth();

      return true;
    }

    if (!this.userStorage.isAuth) {
      this.router.navigate(['sign-in']);
      return false;
    }

    return this.userStorage.isAuth;
  }

  signOutIfAuth(): void {
    if (this.userStorage.isAuth)
      this.userStorage.signOut();
  }

  private confirmEmail(next: ActivatedRouteSnapshot): Observable<boolean> {

    const actionTK = this.guardTK + 'ok';

    return this.authController
      .confirmEmail(next.queryParams['email'], next.queryParams['token'])
      .pipe(
        map(response => {
          const confirmedTK = this.guardTK + 'confirmed';

          this.userStorage.signIn(response);

          this.snackBar.open(this.translate.instant(confirmedTK), this.translate.instant(actionTK));

          if (!this.router.navigated)
            this.router.navigate(['']);

          return false;
        }),
        catchError(() => {
          const unconfirmedTK = this.guardTK + 'unconfirmed';

          if (this.router.navigated) {

            this.snackBar.open(this.translate.instant(unconfirmedTK), this.translate.instant(actionTK));

            return of(false);
          }

          return of(true);
        })
      );
  }
}
