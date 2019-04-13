import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { GetBookApiResponse } from './get-book-api-response';
import { GetBooksApiResponse } from './get-books-api-response';
import { UpdateBookViewModel } from './update-book-view-model';
import { UpdateTranslateBookViewModel } from './update-translate-book-view-model';

@Injectable()
export class BookControllerService {

  readonly controller: string = 'book';

  constructor(
    private api: ApiService
  ) { }

  add(model: { title: string, languageTK: string }): Observable<number> {
    
    return this.api.post(model, this.controller, 'add');
  }

  addTranslate(model: { title: string, languageTK: string, originalTitle: string, originalLanguageTK: string }): Observable<number> {
    
    return this.api.post(model, this.controller, 'addtranslate');
  }

  get(bookId: number): Observable<GetBookApiResponse> {

    return this.api.post(null, this.controller, 'get', bookId.toString());
  }

  getPage(page: number, pageSize: number, filters: {[key: string]: any}[]): Observable<GetBooksApiResponse> {

    let model = {
      page: page,
      pageSize: pageSize,
      filters: filters
    };

    return this.api.post(model, this.controller, 'getpage');
  }

  bookmark(bookId: number, bookmarked: boolean): Observable<GetBookApiResponse> {

    let model = {
      bookmarked: bookmarked
    }
    return this.api.post(model, this.controller, 'bookmark', bookId.toString());
  }

  update(bookId: number, model: UpdateBookViewModel): Observable<void> {
    
    return this.api.post(model, this.controller, 'update', bookId.toString());
  }

  updateTranslate(bookId: number, model: UpdateTranslateBookViewModel): Observable<void> {

    return this.api.post(model, this.controller, 'updatetranslate', bookId.toString());
  }
}
