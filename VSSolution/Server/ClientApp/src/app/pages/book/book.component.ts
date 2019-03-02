import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookControllerService } from 'src/app/api-services/book-controller/book-controller.service';
import { GetBookRVM } from 'src/app/api-services/book-controller/get-book-rvm';
import { BookmarkControllerService } from 'src/app/api-services/bookmark-controller/bookmark-controller.service';
import { UserStorageService } from 'src/app/auth/user-storage.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  model: GetBookRVM = null;
  bookId: number = 0;

  get isTranslate(): boolean {

    if (this.model.originalTitle)
      return true;

    return false;
  }

  constructor(
    private route: ActivatedRoute,
    private bookController: BookControllerService,
    private bookmarksController: BookmarkControllerService,
    private userStorage: UserStorageService
  ) { }

  ngOnInit() {
    this.bookId = +this.route.snapshot.paramMap.get('book');

    this.bookController
      .getBook(this.bookId)
      .subscribe(
        model => {
          this.model = model
        }
        , error => this.handleError(error)
      );
  }

  changeBookmark(): void {

    if (this.model.bookmark)
      this.bookmarksController
        .removeBookmark(this.bookId)
        .subscribe(() => this.model.bookmark = false);
    else
      this.bookmarksController
        .addBookmark(this.bookId)
        .subscribe(() => this.model.bookmark = true);
  }

  handleError(error: any): void {

  }
}
