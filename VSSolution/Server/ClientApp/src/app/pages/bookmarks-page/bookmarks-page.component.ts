import { Component, OnInit } from '@angular/core';
import { InputTemplate } from 'src/app/components/form/input-template';
import { CatalogControllerService } from 'src/app/api-services/catalog-controller/catalog-controller.service';
import { PageService } from 'src/app/services/page/page.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { BookmarkControllerService } from 'src/app/api-services/bookmark-controller/bookmark-controller.service';
import { TranslateService } from '@ngx-translate/core';
import { CatalogPageUpdateEvent } from 'src/app/components/catalog/catalog-page-update-event';

@Component({
  selector: 'app-bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.css']
})
export class BookmarksPageComponent implements OnInit {

  componentTK = 'page.bookmarks.';

  books: { id: number, title: string }[];
  event: CatalogPageUpdateEvent = null;
  filtersTemplate: InputTemplate[];

  constructor(
    private pageService: PageService,
    private catalogController: CatalogControllerService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private bookmarkController: BookmarkControllerService
  ) {
    this.pageService.loaded = true;
    this.filtersTemplate = [
      {
        name: 'translate',
        tk: 'translate-filter',
        type: 'checkbox'
      }
    ];
  }

  ngOnInit() {

    this.update();
  }

  update(event: CatalogPageUpdateEvent = { pageSize: 10, length: 0, pageIndex: 0, filters: [] }): void {

    this.books = null;

    this.catalogController
      .getPage(event.pageIndex, event.pageSize, [{ type: 'bookmark', value: true }, ...event.filters])
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
