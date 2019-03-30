import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';
import { CatalogControllerService } from 'src/app/api-services/catalog-controller/catalog-controller.service';
import { PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { InputTemplate } from 'src/app/components/form/input-template';
import { FormGroup } from '@angular/forms';
import { Filter } from 'src/app/components/filters/filter';

@Component({
  selector: 'app-book-catalog-page',
  templateUrl: './book-catalog-page.component.html',
  styleUrls: ['./book-catalog-page.component.css']
})
export class BookCatalogPageComponent implements OnInit {

  componentTK = 'page.book-catalog.';

  pageIndex: number = 0;
  pageSize: number = 10;
  length: number = 0;
  books: { id: number, title: string }[];
  filters: Filter[] = [];

  _searchValue = null;
  set searchValue(value: string) {
    this._searchValue = value;
    this.updatePage();
  }
  get searchValue(): string {
    return this._searchValue;
  }

  booksLoaded: boolean = false;
  
  filtersFormTemplate: InputTemplate[];

  constructor(
    private pageService: PageService,
    private catalogController: CatalogControllerService,
    private router: Router
  ) {
    this.pageService.loaded = true;
    this.booksLoaded = false;
    this.filtersFormTemplate = [
      {
        name: 'translate',
        tk: 'translate-filter',
        type: 'checkbox'
      }
    ];
  }

  ngOnInit() {

    this.updatePage();
  }

  updatePage(event: PageEvent = null): void {

    if (!event)
      event = { pageSize: this.pageSize, pageIndex: this.pageIndex, length: this.length, previousPageIndex: 0 };

    this.booksLoaded = false;

    let filters = [];
    if (this.searchValue)
      filters.push({type: 'search', value:  this.searchValue });

    for (let element of this.filters)
      filters.push(element);

    this.catalogController
      .getPage(event.pageIndex, event.pageSize, filters)
      .subscribe(
        response => {
          this.pageSize = event.pageSize;
          this.length = response.length;
          this.pageIndex = response.page;
          this.books = response.books;

          this.booksLoaded = true;
        },
        response => {
          this.booksLoaded = true;
          this.pageService.error = { descriptionTK: 'error.unknown' };
        }
      );
  }
  
  applyFilters(filters: Filter[]) {
    this.filters = filters;
    this.updatePage();
  }
}
