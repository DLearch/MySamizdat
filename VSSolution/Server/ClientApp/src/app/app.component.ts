import { Component } from '@angular/core';
import { AccountService } from './pages/account/account.service';

@Component({
  selector: 'runoo-app'
  , template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(
    account: AccountService
  ) {
    //account.updateInfo().subscribe();
  }
}
