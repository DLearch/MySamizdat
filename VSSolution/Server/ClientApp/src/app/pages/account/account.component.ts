import { Component, OnInit } from '@angular/core';
import { UserStorageService } from 'src/app/auth/user-storage.service';
import { DialogWindowService } from 'src/app/layout/dialog-window/dialog-window.service';
import { ImageLoadComponent } from 'src/app/components/image-load/image-load.component';
import { AccountControllerService } from 'src/app/api-services/account-controller/account-controller.service';
import { GetInfoRVM } from 'src/app/api-services/account-controller/get-info-rvm';
import { PageService } from 'src/app/services/page/page.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  host: {
    'class':'page'
  }
})
export class AccountComponent implements OnInit {

  model: GetInfoRVM = null;
  componentTK = 'component.account.';
  isWaiting: boolean = true;
  isEmailVisibilityChanging: boolean = false;

  constructor(
    private userStorage: UserStorageService,
    private accountController: AccountControllerService,
    private pageService: PageService
  ) {
    this.pageService.setTitleTK(this.componentTK + 'title');
  }

  ngOnInit() {
    this.accountController
      .getInfo()
      .subscribe(
      model => {
        this.isWaiting = false;
        this.model = model;
      },
        error => console.log(error)
      );
  }

  onEmailVisibilityChanged(): void {
    this.isEmailVisibilityChanging = true;
    this.accountController
      .changeEmailVisibility(true)////// change
      .subscribe(
        () => this.isEmailVisibilityChanging = false,
        error => console.log(error)
      );
  }
}
