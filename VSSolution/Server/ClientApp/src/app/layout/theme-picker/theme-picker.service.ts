import { Injectable, EventEmitter } from '@angular/core';
import { themes } from './themes';

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

    if (this.class)
      document.body.classList.remove(this.class);

    this.theme = theme;
    this.class = themes[theme];
    localStorage.setItem(this.storageKey, theme);

    if (this.class)
      document.body.classList.add(this.class);
  }
}
