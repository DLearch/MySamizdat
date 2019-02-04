import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.css']
})
export class LanguagePickerComponent implements OnInit {

  readonly defaultLang: string = 'English';
  readonly langs: string[] = [
    'English'
    , 'Русский'
  ];

  get currentLang(): string {
    return this.translate.currentLang ? this.translate.currentLang : this.defaultLang;
  }

  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.translate.setDefaultLang(this.defaultLang);
    this.translate.addLangs(this.langs);
  }

  switchLang(lang: string): void {

    this.translate.use(lang);
  }
}
