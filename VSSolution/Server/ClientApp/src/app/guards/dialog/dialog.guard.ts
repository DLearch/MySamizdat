import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DialogService } from 'src/app/layout/dialog/dialog.service';
import { SignInDialogComponent } from 'src/app/dialogs/sign-in-dialog/sign-in-dialog.component';
import { SignUpDialogComponent } from 'src/app/dialogs/sign-up-dialog/sign-up-dialog.component';
import { AuthControllerService } from 'src/app/api-services/auth-controller/auth-controller.service';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';
import { NewTeamDialogComponent } from 'src/app/dialogs/new-team-dialog/new-team-dialog.component';
import { InviteTeamMemberDialogComponent } from 'src/app/dialogs/invite-team-member-dialog/invite-team-member-dialog.component';
import { ChangeBookTeamDialogComponent } from 'src/app/dialogs/change-book-team-dialog/change-book-team-dialog.component';

@Injectable()
export class DialogGuard implements CanActivate {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private userStorage: UserStorageService,
    private dialog: DialogService,
    private authController: AuthControllerService
  ) {  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.router.navigated) {

      this.openIf('sign-in', next, SignInDialogComponent);
      this.openIf('sign-up', next, SignUpDialogComponent);
      this.openIf('new-team', next, NewTeamDialogComponent);
      this.openIf('book/:book/change-team', next, ChangeBookTeamDialogComponent);
      this.openIf('team/:team/invite', next, InviteTeamMemberDialogComponent);

      if (this.dialog.opened) 
        return false;
    }
    
    return true;
  }

  openIf(path: string, next: ActivatedRouteSnapshot, component: any) {

    if (next.routeConfig.path === path)
      this.dialog.open(component);
  }

  private confirmEmail(next: ActivatedRouteSnapshot): Observable<boolean> {

    return this.authController
      .confirmEmail(next.queryParams['email'], next.queryParams['token'])
      .pipe(
        map(response => {

          this.userStorage.signIn(response);

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
