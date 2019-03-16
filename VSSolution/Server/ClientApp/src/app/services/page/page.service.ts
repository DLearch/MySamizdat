import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Injectable()
export class PageService {

  defaultTitle: string = 'Runoo';
  titleEnd: string = ' - Runoo';
  titleTK: string = null;

  loaded = true;
  
  constructor(
    private titleService: Title,
    private translate: TranslateService,
    private router: Router
  ) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart)
        this.setDefaultTitle();
    });

    this.translate.onLangChange.subscribe(() => {
      if (this.titleTK)
        this.setTitleTK(this.titleTK);
    });
  }

  setTitle(title: string) {
    this.titleTK = null;
    this.titleService.setTitle(title + this.titleEnd);
  }

  setTitleTK(translateKey: string) {
    this.titleTK = translateKey;
    const title = this.translate.instant(this.titleTK);
    this.titleService.setTitle(title + this.titleEnd);
  }

  setDefaultTitle() {
    this.titleTK = null;
    this.titleService.setTitle(this.defaultTitle);
  }
}
