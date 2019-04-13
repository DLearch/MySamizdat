import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable()
export class LanguageControllerService {

  readonly controller: string = 'language';

  constructor(
    private api: ApiService
  ) { }

  get(): Observable<string[]> {

    return this.api.post(null, this.controller, 'get');
  }
}
