import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  readonly _config: { [key: string]: any } = {
    apiUrl: 'https://localhost:44314/api',
    url: 'https://localhost:44314/',
    defaultAvatarPath: 'files/default-avatar.png',
    defaultCoverPath: 'files/default-cover.png'
  };

  getString(key: string): string {
    return this._config[key] as string;
  }

  get(key: string): any {
    return this._config[key];
  }
}
