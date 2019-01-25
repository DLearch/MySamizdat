import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';
import { EmailConfirmationService } from 'src/app/services/email-confirmation/email-confirmation.service';

@Component({
  selector: 'app-account'
  , templateUrl: './account.component.html'
  , styleUrls: ['./account.component.css']
  , providers: [AccountService, EmailConfirmationService]
})
export class AccountComponent implements OnInit {

  emailConfirmationMessageSent: boolean;

  get emailIsVisible(): boolean {
    return this.userStorage.user.emailIsVisible;
  }
  set emailIsVisible(value: boolean) {
    
    this.accountService
      .switchEmailVisibility({ emailIsVisible: value })
  }

  constructor(
    private accountService: AccountService
    , private userStorage: UserStorageService
    , private emailConfirmationService: EmailConfirmationService
  ) { }

  ngOnInit() {

    this.accountService.updateUserStorage().subscribe();
  }

  sendEmailConfirmationMessage(): void {

    this.emailConfirmationService.send().subscribe(
      () => this.emailConfirmationMessageSent = true
    );
  }
}
