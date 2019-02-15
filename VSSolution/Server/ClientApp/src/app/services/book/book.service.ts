import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { CreateVM } from './create-vm';
import { map } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { BookCatalogInfo } from './book-catalog-info';

@Injectable()
export class BookService {

  private readonly controller: string = 'book';

  constructor(
    private api: ApiService
  ) { }

  create(model: CreateVM): Observable<number> {

    return this.api
      .post(model, this.controller, 'add')
      .pipe(
        map(response => response.id)
      );
  }

  get(id: number): Observable<Book> {

    return this.api
      .post({ id: id }, this.controller, 'get')
      .pipe(
        map(response => response.book)
      );
  }

  getCatalog(pageSize: number, page: number = 0): Observable<BookCatalogInfo> {

    return this.api
      .post({ pageSize: pageSize, page: page }, this.controller, 'getcatalog');
  }

  comment(content: string, bookId: number, parentId: number = 0): Observable<void> {

    return this.api
      .post({ content: content, bookId: bookId, parentId: parentId }, this.controller, 'comment');
  }
}
