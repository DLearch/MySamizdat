import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class PageServiceService {

  defaultTitle: string = 'Runoo';
  titleEnd: string = ' - Runoo';
  titleTK: string = null;

  maxWidth: string = '1000px';
  padding: string = '16px';
  loaded: boolean = true;

  constructor(
    private titleService: Title,
    private translate: TranslateService
  ) {
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
