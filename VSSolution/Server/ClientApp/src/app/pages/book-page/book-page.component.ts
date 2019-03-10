import { Component } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
  host: {
    'class': 'page'
  }
})
export class BookPageComponent {

  componentTK = 'component.book.';

  constructor(
    private pageService: PageService
  ) {
    this.pageService.setTitleTK(this.componentTK + 'title');
  }

  loaded(loaded: boolean) {
    setTimeout(() => this.pageService.loaded = loaded);
  }
}
