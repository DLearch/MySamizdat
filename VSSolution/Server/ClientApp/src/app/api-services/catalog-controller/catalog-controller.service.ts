import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { GetPageRVM } from './get-page-rvm';
import { Observable } from 'rxjs';

@Injectable()
export class CatalogControllerService {

  readonly controller: string = 'bookcatalog';

  constructor(
    private api: ApiService
  ) { }

  getPage(page: number, pageSize: number, filters: { type: string, value?: any }[]): Observable<GetPageRVM> {

    let model = {
      page: page,
      pageSize: pageSize,
      filters: filters
    };

    return this.api.post(model, this.controller, 'getpage');
  }
}
