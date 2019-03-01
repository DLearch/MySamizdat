import { Component, OnInit } from '@angular/core';
import { BookmarkControllerService } from 'src/app/api-services/bookmark-controller/bookmark-controller.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { GetBookmarksRVM } from 'src/app/api-services/bookmark-controller/get-bookmarks-rvm';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  books: GetBookmarksRVM[];

  constructor(
    private bookmarkController: BookmarkControllerService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.bookmarkController
      .getBookmarks()
      .subscribe(model => this.books = model);
  }

  removeBookmark(book: GetBookmarksRVM): void {
    
    this.bookmarkController
      .removeBookmark(book.id)
      .subscribe(() => {

        const index = this.books.indexOf(book);
        this.books.splice(index, 1)

        const messageTK: string = 'bookmark-removed';
        const actionTK: string = 'button-texts.cancel';

        this.translate
          .get([messageTK, actionTK])
          .subscribe(response => {
            
            let snackBarRef: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(response[messageTK], response[actionTK]);
            snackBarRef
              .onAction()
              .subscribe(() => {

                this.bookmarkController
                  .addBookmark(book.id)
                  .subscribe(() => {
                    this.books.splice(index, 0, book);
                  });
              });
          });
      });
  }
}
