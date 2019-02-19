import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserStorageService } from 'src/app/auth/user-storage.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent {

  constructor(
    private userStorage: UserStorageService,
    public auth: AuthService
  ) { }
  
}
