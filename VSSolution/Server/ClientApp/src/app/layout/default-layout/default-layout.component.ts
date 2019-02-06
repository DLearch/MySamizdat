import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';
import { AuthGuard } from 'src/app/services/auth-guard/auth.guard';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatBottomSheet } from '@angular/material';
import { SignInComponent } from '../auth/sign-in/sign-in.component';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent {

  constructor(
    private breakpointObserver: BreakpointObserver
    , private authGuard: AuthGuard
    , private userStorage: UserStorageService
    , private auth: AuthService
    , private bottomSheet: MatBottomSheet
  ) { }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  openSignIn(): void {

    this.bottomSheet.open(SignInComponent);
  }
}
