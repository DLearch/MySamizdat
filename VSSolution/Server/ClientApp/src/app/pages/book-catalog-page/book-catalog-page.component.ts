import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';
import { CatalogControllerService } from 'src/app/api-services/catalog-controller/catalog-controller.service';
import { InputTemplate } from 'src/app/components/form/input-template';
import { CatalogPageUpdateEvent } from 'src/app/components/catalog/catalog-page-update-event';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-book-catalog-page',
  templateUrl: './book-catalog-page.component.html',
  styleUrls: ['./book-catalog-page.component.css']
})
export class BookCatalogPageComponent implements OnInit {

  componentTK = 'page.book-catalog.';

  books: { id: number, title: string }[];
  event: CatalogPageUpdateEvent = null;
  filtersTemplate: InputTemplate[];
  
  constructor(
    private pageService: PageService,
    private catalogController: CatalogControllerService
  ) {
    this.filtersTemplate = [
      {
        name: 'translate',
        tk: 'translate-filter',
        type: 'checkbox'
      }
    ];

    this.pageService.loaded = true;
  }

  ngOnInit() {

    this.update();
  }

  update(event: CatalogPageUpdateEvent = { pageSize: 10, length: 0, pageIndex: 0, filters: null }): void {

    this.books = null;

    this.catalogController
      .getPage(event.pageIndex, event.pageSize, event.filters)
      .subscribe(
        response => {

          this.books = response.books;

          this.event = {
            length: response.length,
            pageSize: event.pageSize,
            pageIndex: response.page,
            filters: event.filters
          };
        },
        response => {
          this.pageService.error = { descriptionTK: 'error.unknown' };
        }
      );
  }
}
