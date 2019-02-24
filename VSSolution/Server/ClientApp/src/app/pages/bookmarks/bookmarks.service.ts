import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { Bookmark } from './bookmark';
import { map } from 'rxjs/operators';
import { GetRVM } from './get-rvm';

@Injectable()
export class BookmarksService {

  constructor(
    private api: ApiService
  ) { }

  get(): Observable<Bookmark[]> {

    return this.api
      .post(null, 'bookmark', 'get')
      .pipe(map((response: GetRVM) => response.bookmarks));
  }

  remove(bookId: number): Observable<void> {

    return this.api
      .post({ bookId: bookId}, 'bookmark', 'remove');
  }

  add(bookId: number): Observable<void> {

    return this.api
      .post({ bookId: bookId }, 'bookmark', 'add');
  }
}
