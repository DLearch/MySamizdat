import { Injectable } from '@angular/core';
import { themes } from './themes';
import { window } from 'rxjs/operators';

@Injectable()
export class ThemePickerService {

  storageKey: string = 'theme';

  readonly defaultTheme: string = 'dark';

  theme: string = this.defaultTheme;
  class: string = themes[this.defaultTheme];

  constructor() {
    this.setTheme(localStorage.getItem(this.storageKey));
  }

  setTheme(theme: string) {

    this.theme = theme;
    this.class = themes[theme];
    localStorage.setItem(this.storageKey, theme)
  }
}
