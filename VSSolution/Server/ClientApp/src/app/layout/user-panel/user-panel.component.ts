import { Component } from '@angular/core';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent {

  componentTK = 'layout.user-panel.';

  constructor(
    private userStorage: UserStorageService
  ) { }

}
