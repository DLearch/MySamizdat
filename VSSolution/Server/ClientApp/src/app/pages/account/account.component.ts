import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { UserStorageService } from 'src/app/auth/user-storage.service';
import { DialogWindowService } from 'src/app/layout/dialog-window/dialog-window.service';
import { ImageLoadComponent } from 'src/app/components/image-load/image-load.component';

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
    private account: AccountService,
    private dialog: DialogWindowService
  ) { }

  ngOnInit() {
    this.account
      .updateInfo()
      .subscribe(
        () => this.isWaiting = false,
        error => console.log(error)
      );
  }

  onEmailVisibilityChanged(): void {
    this.isEmailVisibilityChanging = true;
    this.account
      .changeEmailVisibility(this.userStorage.user.emailIsVisible)
      .subscribe(
        () => this.isEmailVisibilityChanging = false,
        error => console.log(error)
      );
  }

  changeAvatar(): void {
    this.dialog.open(ImageLoadComponent);
  }
}
