import { Component, OnInit } from '@angular/core';
import { UserStorageService } from 'src/app/auth/user-storage.service';
import { DialogWindowService } from 'src/app/layout/dialog-window/dialog-window.service';
import { ImageLoadComponent } from 'src/app/components/image-load/image-load.component';
import { AccountControllerService } from 'src/app/api-services/account-controller/account-controller.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  isWaiting: boolean = true;
  isEmailVisibilityChanging: boolean = false;

  constructor(
    private userStorage: UserStorageService,
    private accountController: AccountControllerService
  ) { }

  ngOnInit() {
    this.accountController
      .getInfo()
      .subscribe(
        () => this.isWaiting = false,
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
