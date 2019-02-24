import { Component, Input } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { UserStorageService } from 'src/app/auth/user-storage.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {

  @Input() user: { userName: string, avatarPath: string } = null;

  constructor(
    private config: ConfigurationService,
    private userStorage: UserStorageService
  ) { }

  get avatarPath(): string {
    
    if (this.user && this.user.avatarPath)
      return this.user.avatarPath;

    return this.config.getString('defaultAvatarPath');
  }

  getLink(): string[] | string {

    if (!this.user || !this.user.userName)
      return '/users';
    
    if (this.userStorage.userName && this.userStorage.userName === this.user.userName)
      return '/account';

    return ['/users', this.user.userName];
  }
}
