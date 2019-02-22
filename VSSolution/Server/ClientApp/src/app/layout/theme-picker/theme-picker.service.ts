import { Injectable } from '@angular/core';
import { themes } from './themes';

@Injectable()
export class ThemePickerService {

  readonly defaultTheme: string = 'light';

  theme: string = this.defaultTheme;
  class: string = themes[this.defaultTheme];
  
  setTheme(theme: string) {

    this.theme = theme;
    this.class = themes[theme];
  }
}
