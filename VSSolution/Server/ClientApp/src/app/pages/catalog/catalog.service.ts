import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogControllerService } from 'src/app/api-services/catalog-controller/catalog-controller.service';
import { GetPageRVM } from 'src/app/api-services/catalog-controller/get-page-rvm';

@Injectable()
export class CatalogService {

  constructor(
    private catalogController: CatalogControllerService
  ) { }

  get(pageSize: number, page: number = 0): Observable<GetPageRVM> {

    return this.catalogController.getPage(page, pageSize);
  }
}
