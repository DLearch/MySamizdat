import { Component } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css'],
  host: {
    'class': 'page'
  }
})
export class CatalogPageComponent {

  componentTK = 'component.catalog.';

  constructor(
    private pageService: PageService
  ) {
    this.pageService.setTitleTK(this.componentTK + 'title');
  }

  loaded(loaded: boolean) {
    setTimeout(() => this.pageService.loaded = loaded);
  }
}
