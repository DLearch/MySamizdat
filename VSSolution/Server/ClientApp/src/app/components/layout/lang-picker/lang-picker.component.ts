import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigService } from 'src/app/services/app-config/app-config.service';

@Component({
  selector: 'app-lang-picker',
  templateUrl: './lang-picker.component.html',
  styleUrls: ['./lang-picker.component.css']
})
export class LangPickerComponent implements OnInit {

  get currentLanguage(): string {
    return this.translate.currentLang ? this.translate.currentLang : this._config.get('DefaultLang') as string;
  }

  constructor(
    private _config: AppConfigService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.translate.setDefaultLang(this._config.get('DefaultLang') as string);
    this.translate.addLangs(this._config.get('Langs') as string[]);
  }

  switchLang(lang: string): void {

    this.translate.use(lang);
  }
}
