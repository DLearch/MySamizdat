import { Component, OnInit } from '@angular/core';
import { InputTemplate } from 'src/app/components/form/input-template';
import { Router } from '@angular/router';
import { CatalogControllerService } from 'src/app/api-services/catalog-controller/catalog-controller.service';
import { PageService } from 'src/app/services/page/page.service';
import { Filter } from 'src/app/components/filters/filter';
import { PageEvent, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { BookmarkControllerService } from 'src/app/api-services/bookmark-controller/bookmark-controller.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.css']
})
export class BookmarksPageComponent implements OnInit {

  componentTK = 'page.bookmarks.';

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
    private router: Router,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private bookmarkController: BookmarkControllerService
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
      filters.push({ type: 'search', value: this.searchValue });

    for (let element of this.filters)
      filters.push(element);

    filters.push({ type: 'bookmark', value: true });
    
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

  removeBookmark(book: any) {

    this.bookmarkController
      .removeBookmark(book.id)
      .subscribe(() => {

        const index = this.books.indexOf(book);
        this.books.splice(index, 1)

        const messageTK: string = 'bookmark-removed';
        const actionTK: string = 'button-texts.cancel';


        let snackBarRef: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(this.translate.instant(messageTK), this.translate.instant(actionTK));

        snackBarRef.onAction().subscribe(() => {

          this.bookmarkController
            .addBookmark(book.id)
            .subscribe(() => {
              this.books.splice(index, 0, book);
            });
        });

      });
  }
}
