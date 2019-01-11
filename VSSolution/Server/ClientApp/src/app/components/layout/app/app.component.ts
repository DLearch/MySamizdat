import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigService } from 'src/app/services/app-config/app-config.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  isAuthenticatedSubscription: Subscription;
  isAuthenticated: boolean;

  ngAfterViewInit(): void {

    this.isAuthenticatedSubscription = this.userStorage
      .isTokenChanged()
      .pipe(startWith(!this.userStorage.isEmpty()), delay(0))
      .subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
    }
  
  constructor(
    private config: AppConfigService,
    private breakpointObserver: BreakpointObserver,
    private translate: TranslateService,
    private userStorage: UserStorageService
  ) { }

  ngOnInit() { }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
  );

  ngOnDestroy(): void {

    this.isAuthenticatedSubscription.unsubscribe();
  }
}
