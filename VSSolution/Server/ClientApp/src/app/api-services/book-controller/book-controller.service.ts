import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable, throwError } from 'rxjs';
import { GetBookRVM } from './get-book-rvm';

@Injectable()
export class BookControllerService {

  readonly controller: string = 'book';

  constructor(
    private api: ApiService
  ) { }

  addBook(title: string, languageTK: string): Observable<number> {

    let model = {
      title: title,
      languageTK: languageTK
    };

    return this.api.post(model, this.controller, 'addbook');
  }

  addTranslateBook(title: string, languageTK: string, originalTitle: string, originalLanguageTK: string): Observable<number> {

    let model = {
      title: title,
      languageTK: languageTK,
      originalTitle: originalTitle,
      originalLanguageTK: originalLanguageTK
    };

    return this.api.post(model, this.controller, 'addtranslatebook');
  }

  removeBook(bookId: number): Observable<void> {

    let model = {
      bookId: bookId
    };

    return this.api.post({ bookId: bookId }, this.controller, 'remove');
  }

  getBook(bookId: number): Observable<GetBookRVM> {

    if (!bookId) 
      return throwError({BookId: "empty"});

    let model = {
      bookId: bookId
    };

    return this.api.post(model, this.controller, 'getbook');
  }
}
