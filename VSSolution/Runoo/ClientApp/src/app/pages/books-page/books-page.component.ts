import { Component, OnInit } from '@angular/core';
import { CatalogPageUpdateEvent } from 'src/app/components/catalog/catalog-page-update-event';
import { InputTemplate } from 'src/app/components/form/input-template';
import { PageService } from 'src/app/services/page/page.service';
import { BookControllerService } from 'src/app/api/book/book-controller.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Filter } from 'src/app/components/filters/filter';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})
export class BooksPageComponent implements OnInit {

  componentTK = 'page.book-catalog.';

  books: { id: number, title: string }[];
  event: CatalogPageUpdateEvent = null;
  filtersTemplate: InputTemplate[];
  queryFilters: Filter[] = [];

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private bookController: BookControllerService
  ) {
    this.route.queryParams.subscribe(params => {
      this.updateFiltersTemplate(params);
    });

    this.pageService.loaded = true;
  }

  updateFiltersTemplate(params: Params = {}) {

    this.filtersTemplate = [
      {
        name: 'translate',
        tk: 'translate-filter',
        type: 'checkbox',
        value: (params['translate'] ? params['translate'] : null)
      }
    ];
    for (let param in params) {
      this.queryFilters.push({ type: param, value: params[param] });
    }

    this.update();
  }

  ngOnInit() {
    
  }

  update(event: CatalogPageUpdateEvent = { pageSize: 10, length: 0, pageIndex: 0, filters: null }): void {

    this.books = null;

    if (!event.filters)
      event.filters = [];
    let filters = [...event.filters, ...this.queryFilters];

    this.bookController
      .getPage(event.pageIndex, event.pageSize, filters)
      .subscribe(
        response => {

          this.books = response.books;

          this.event = {
            length: response.length,
            pageSize: event.pageSize,
            pageIndex: response.page,
            filters: filters
          };
        },
        response => {
          this.pageService.error = { descriptionTK: 'error.unknown' };
        }
      );
  }
}
