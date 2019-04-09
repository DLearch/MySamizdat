import { Component, Input } from '@angular/core';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
  
  @Input() set user(value: { userName: string, avatarPath: string }) {

    if (value && value.avatarPath) {

      this.avatarPath = value.avatarPath;

      if (this.avatarPath)
        while (this.avatarPath.indexOf('\\') != -1)
          this.avatarPath = this.avatarPath.replace('\\', '/');
    }
    else
      this.avatarPath = this.config.getString('defaultAvatarPath');

    if (!value || !value.userName)
      this.link = '/user';
    else
      this.link = ['/user', value.userName];
  }

  avatarPath: string = null;
  link: string | string[] = null;

  constructor(
    private config: ConfigurationService,
    private userStorage: UserStorageService
  ) { }
}
