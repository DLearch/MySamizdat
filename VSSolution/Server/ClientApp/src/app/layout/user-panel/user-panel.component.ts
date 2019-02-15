import { Component } from '@angular/core';
import { AuthGuard } from 'src/app/services/auth-guard/auth.guard';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SignInService } from 'src/app/services/sign-in/sign-in.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent {

  constructor(
    public authGuard: AuthGuard
    , private userStorage: UserStorageService
    , public auth: AuthService
    , private signIn: SignInService
  ) { }
  
}
