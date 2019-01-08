import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigService } from 'src/app/services/app-config/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(
    private config: AppConfigService,
    public translate: TranslateService
  ) {
    translate.setDefaultLang(this.config.get('DefaultLang') as string);
  }

  ngOnInit() {
  }

}
