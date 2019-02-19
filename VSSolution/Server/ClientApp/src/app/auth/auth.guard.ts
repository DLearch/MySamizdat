import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { DialogWindowService } from '../layout/dialog-window/dialog-window.service';
import { ApiAuthService } from './api-auth/api-auth.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private apiAuth: ApiAuthService,
    private dialogWindow: DialogWindowService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    //console.log(next);
    //console.log(state);
    //console.log(this.router);

    if (next.routeConfig.path === 'sign-in') {

      this.signOutIfAuth();

      if (this.router.navigated) {

        this.openSignIn();

        return false;
      }

      return true;
    }

    if (next.routeConfig.path === 'sign-up') {

      this.signOutIfAuth();

      if (this.router.navigated) {

        this.openSignUp();

        return false;
      }

      return true;
    }

    if (next.routeConfig.path === 'confirm-email') {

      this.signOutIfAuth();

      return this.confirmEmail(next);
    }

    return this.authService.isAuth;
  }

  signOutIfAuth(): void {
    if (this.authService.isAuth)
      this.authService.signOut();
  }

  openSignIn(): void {
    this.dialogWindow.open(SignInComponent, { titleTK: 'pages.sign-in.name', closeButtonVisible: true });
  }

  openSignUp(): void {
    this.dialogWindow.open(SignUpComponent, { titleTK: 'pages.sign-up.name', closeButtonVisible: true });
  }

  private confirmEmail(next: ActivatedRouteSnapshot): Observable<boolean> {

    return this.apiAuth.confirmEmail({
      email: next.queryParams['email'],
      token: next.queryParams['token']
    }).pipe(
      map(() => {

        this.snackBar.open('Email confirmed! ', 'Ok');

        if (!this.router.navigated)
          this.router.navigate(['']);

        return false;
      }),
      catchError(() => {

        if (this.router.navigated) {

          this.snackBar.open('Error! Email unconfirmed. ', 'Ok');

          return of(false);
        }

        return of(true);
      })
    );
  }
}
