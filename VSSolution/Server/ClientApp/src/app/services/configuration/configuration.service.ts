import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

  readonly _config: { [key: string]: any } = {
    apiUrl: 'https://localhost:44314/api',
    imagesUrl: 'https://localhost:44314/images/',
    url: 'https://localhost:44314/',
    defaultAvatarUri: ''
  };

  getString(key: string): string {
    return this._config[key] as string;
  }

  get(key: string): any {
    return this._config[key];
  }
}
