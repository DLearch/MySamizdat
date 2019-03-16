import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { GetBookmarksRVM } from './get-bookmarks-rvm';

@Injectable()
export class BookmarkControllerService {

  readonly controller: string = 'bookmark';

  constructor(
    private api: ApiService
  ) { }

  addBookmark(bookId: number): Observable<void> {

    let model = {
      bookId: bookId
    };

    return this.api.post(model, this.controller, 'addbookmark');
  }

  removeBookmark(bookId: number): Observable<void> {

    let model = {
      bookId: bookId
    };

    return this.api.post(model, this.controller, 'removebookmark');
  }

  getBookmarks(): Observable<GetBookmarksRVM[]> {
    
    return this.api.post(null, this.controller, 'get');
  }
}
