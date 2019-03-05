import { Component } from '@angular/core';
import { ThemePickerService } from './theme-picker.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.css']
})
export class ThemePickerComponent {

  componentTK = 'component.theme-picker.';

  get isDark(): boolean {
    return this.themePickerService.theme === 'dark';
  }

  set isDark(value: boolean) {
    this.themePickerService.setTheme(value ? 'dark': 'light');
  }


  constructor(
    private themePickerService: ThemePickerService
  ) { }
}
