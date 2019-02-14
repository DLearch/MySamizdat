import { Component } from '@angular/core';
import { AuthGuard } from 'src/app/services/auth-guard/auth.guard';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthDialogService } from 'src/app/services/auth-dialog/auth-dialog.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent {

  constructor(
    private authGuard: AuthGuard
    , private userStorage: UserStorageService
    , private auth: AuthService
    , private authDialog: AuthDialogService
  ) { }
  
}
