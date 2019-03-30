import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserControllerService } from 'src/app/api-services/user-controller/user-controller.service';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';
import { GetUserRVM } from 'src/app/api-services/user-controller/get-user-rvm';
import { PageService } from 'src/app/services/page/page.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorPageData } from '../error-page/error-page-data';
import { BreakpointService } from 'src/app/services/breakpoint/breakpoint.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  readonly componentTK = 'page.user.';
  readonly notFoundError: ErrorPageData = { error: '404', descriptionTK: 'error.user-not-found' };

  userName: string;
  model: GetUserRVM;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private breakpointService: BreakpointService,
    private userController: UserControllerService,
    private userStorage: UserStorageService
  ) {
    this.startPageLoad();
  }

  ngOnInit() {

    this.route.params.subscribe(params =>
      this.loadUser(params['user'])
        .subscribe(() => this.finishPageLoad())
    );
  }

  loadUser(userName: string): Observable<boolean> {
    
    if (userName)
      this.userName = userName;
    else
      this.userName = this.userStorage.userName;

    return this.userController
      .getUser(this.userName)
      .pipe(
        map(response => this.userLoadSuccess(response)),
        catchError(response => this.userLoadError(response))
      );
  }

  userLoadSuccess(response): boolean {

    this.model = response;

    this.setTitle();

    return true;
  }

  userLoadError(error): Observable<boolean> {

    this.pageService.error = this.notFoundError;

    return of(false);
  }

  startPageLoad() {
    this.pageService.loaded = false;
  }

  finishPageLoad() {
    this.pageService.loaded = true;
  }

  setTitle() {

    if (!this.userName)
      this.pageService.setDefaultTitle();
    else if (this.userName == this.userStorage.userName)
      this.pageService.setTitleTK(this.componentTK + 'title');
    else
      this.pageService.setTitle(this.userName);
  }

  onEmailVisibilityChanged(value: boolean): void {

    this.userController
      .changeEmailVisibility(value)
      .subscribe();
  }
  
}
