import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GetBookRVM } from './get-book-rvm';

@Injectable()
export class BookControllerService {

  readonly controller: string = 'book';

  constructor(
    private api: ApiService
  ) { }

  addBook(title: string, languageTK: string, originalTitle: string = null): Observable<number> {

    let model = {
      title: title,
      languageTK: languageTK,
      originalTitle: originalTitle
    };

    return this.api.post(model, this.controller, 'add');
  }

  removeBook(bookId: number): Observable<void> {

    let model = {
      bookId: bookId
    };

    return this.api.post({ bookId: bookId }, this.controller, 'remove');
  }

  getBook(bookId: number): Observable<GetBookRVM> {

    let model = {
      bookId: bookId
    };

    return this.api.post(model, this.controller, 'get');
  }
}
