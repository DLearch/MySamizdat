import { Component, Input } from '@angular/core';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';

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
      return '/user';

    if (this.userStorage.userName && this.userStorage.userName === this.user.userName)
      return '/account';

    return ['/user', this.user.userName];
  }
}
