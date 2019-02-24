import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from 'src/app/models/book';

@Injectable()
export class BookService {

  constructor(
    private api: ApiService
  ) { }

  get(bookId: number): Observable<Book> {

    return this.api
      .post({ bookId: bookId }, 'book', 'get')
      .pipe(
        map(response => response.book)
      );
  }
}
