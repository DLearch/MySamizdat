import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { BookCatalogInfo } from './book-catalog-info';
import { Observable } from 'rxjs';

@Injectable()
export class CatalogService {

  constructor(
    private api: ApiService
  ) { }

  get(pageSize: number, page: number = 0): Observable<BookCatalogInfo> {

    return this.api
      .post({ pageSize: pageSize, page: page }, 'book', 'getcatalog');
  }
}
