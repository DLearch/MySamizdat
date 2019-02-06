import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatBottomSheet } from '@angular/material';
import { EmailConfirmedComponent } from 'src/app/layout/auth/email-confirmed/email-confirmed.component';
import { EmailUnconfirmedComponent } from 'src/app/layout/auth/email-unconfirmed/email-unconfirmed.component';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmationGuard implements CanActivate {

  constructor(
    private authService: AuthService
    , private bottomSheet: MatBottomSheet
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.authService.confirmEmail({
      email: next.queryParams['email']
      , token: next.queryParams['token']
    }).subscribe(
      () => this.bottomSheet.open(EmailConfirmedComponent)
      , () => this.bottomSheet.open(EmailUnconfirmedComponent)
      );
    
    return true;
  }
}
