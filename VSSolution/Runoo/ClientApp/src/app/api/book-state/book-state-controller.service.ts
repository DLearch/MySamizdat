import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable()
export class BookStateControllerService {

  readonly controller: string = 'bookstate';

  constructor(
    private api: ApiService
  ) { }

  get(): Observable<string[]> {

    return this.api.post(null, this.controller, 'get');
  }
}
