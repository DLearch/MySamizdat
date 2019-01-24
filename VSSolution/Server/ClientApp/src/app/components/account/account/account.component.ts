import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';

@Component({
  selector: 'app-account'
  , templateUrl: './account.component.html'
  , styleUrls: ['./account.component.css']
  , providers: [AccountService]
})
export class AccountComponent implements OnInit {

  emailIsVisible: boolean;

  constructor(
    private accountService: AccountService
    , private userStorage: UserStorageService
  ) { }

  ngOnInit() {

    this.accountService.updateUserStorage();

    if (this.userStorage.user) {

      this.emailIsVisible = this.userStorage.user.emailIsVisible;
    }
  }

  switchEmailVisibility(state: boolean): void {

    this.accountService
      .switchEmailVisibility({ emailIsVisible: state })
      .subscribe(
        response => this.emailIsVisible = response
      );
  }
}
