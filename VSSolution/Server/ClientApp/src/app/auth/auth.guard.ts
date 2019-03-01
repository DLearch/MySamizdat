import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { DialogWindowService } from '../layout/dialog-window/dialog-window.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { AuthControllerService } from '../api-services/auth-controller/auth-controller.service';

@Injectable()
export class AuthGuard implements CanActivate {

  readonly authRoutes: string[] = [
    'create-book',
    'bookmarks',
    'account',
    //'book/????/create-chapter'
  ];

  constructor(
    private authService: AuthService,
    private dialogWindow: DialogWindowService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authController: AuthControllerService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    //console.log(next);
    //console.log(state);
    //console.log(this.router);
    
    if (!this.authService.isAuth && this.authRoutes.includes(next.routeConfig.path) || next.routeConfig.path === 'sign-in') {

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
    this.dialogWindow.open(SignInComponent, { titleTK: 'page.sign-in.name', closeButtonVisible: true });
  }

  openSignUp(): void {
    this.dialogWindow.open(SignUpComponent, { titleTK: 'page.sign-up.name', closeButtonVisible: true });
  }

  private confirmEmail(next: ActivatedRouteSnapshot): Observable<boolean> {

    return this.authController
      .confirmEmail(next.queryParams['email'], next.queryParams['token'])
      .pipe(
        map(response => {

        this.authService.signIn(response.userName, response.token);

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
