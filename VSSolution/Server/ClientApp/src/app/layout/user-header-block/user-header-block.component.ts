import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { AccountComponent } from 'src/app/pages/account/account.component';

@Component({
  selector: 'app-user-header-block'
  , templateUrl: './user-header-block.component.html'
  , styleUrls: ['./user-header-block.component.css']
})
export class UserHeaderBlockComponent {

  constructor(
    private accountService: AccountService
  ) { }

}
