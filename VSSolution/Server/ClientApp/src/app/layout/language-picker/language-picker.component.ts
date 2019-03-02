import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.css']
})
export class LanguagePickerComponent implements OnInit {

  storageKey: string = 'language';

  defaultLang: string = 'English';
  readonly langs: string[] = [
    'English'
    , 'Русский'
  ];

  get currentLang(): string {
    return this.translate.currentLang ? this.translate.currentLang : this.defaultLang;
  }

  constructor(
    public translate: TranslateService
  ) {

    switch (this.translate.getBrowserLang()) {
      case 'ru':
        this.defaultLang = 'Русский';
        break;
      case 'ua':
        this.defaultLang = 'Русский';
        break;
    }
  }

  ngOnInit() {

    this.translate.setDefaultLang(this.defaultLang);

    let storageLanguage: string = localStorage.getItem(this.storageKey);
    if (storageLanguage)
      this.translate.use(storageLanguage);
    else
      this.translate.use(this.defaultLang);
    
    this.translate.addLangs(this.langs);
  }

  switchLang(lang: string): void {

    localStorage.setItem(this.storageKey, lang);
    this.translate.use(lang);
  }
}
