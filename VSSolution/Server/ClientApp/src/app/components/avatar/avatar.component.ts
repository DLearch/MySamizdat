import { Component, OnInit, Input } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { UserStorageService } from 'src/app/auth/user-storage.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {

  readonly defaultAvatarUri: string = 'images/avatars/default.png';

  @Input() imageType: string = null;
  @Input() userName: string | 'default' = null;

  get avatarUri(): string {

    if (this.userName && this.imageType)
      return '/images/avatars/' + this.userName + this.imageType;

    return this.defaultAvatarUri;
  }

  getLink(): string[] | string {

    if (!this.userName)
      return '/users';

    if ('default' === this.userName || this.userStorage.userName === this.userName)
      return '/account';

    return ['/users', this.userName];
  }

  constructor(
    private userStorage: UserStorageService
  ) { }
}
