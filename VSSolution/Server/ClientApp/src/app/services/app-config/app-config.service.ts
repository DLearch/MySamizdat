import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private _config: { [key: string]: string | string[] };

  public constructor() {

    this._config = {
      PathAPI: 'https://localhost:44314/',
      DefaultLang: 'English',
      Langs: [ 'English', 'Русский' ]
    };
  }

  public get(key: any): string | string[] {
    return this._config[key];
  }
}
