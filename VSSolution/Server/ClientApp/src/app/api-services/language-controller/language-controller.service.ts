import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageControllerService {

  readonly controller: string = 'language';

  constructor(
    private api: ApiService
  ) { }

  addLanguage(translateKey: string): Observable<void> {

    let model = {
      languageTK: translateKey
    };

    return this.api.post(model, this.controller, 'add');
  }

  removeLanguage(translateKey: string): Observable<void> {

    let model = {
      languageTK: translateKey
    };

    return this.api.post(model, this.controller, 'remove');
  }

  getLanguages(): Observable<string[]> {
    
    return this.api.post(null, this.controller, 'get');
  }

  getBookStateTKs(): Observable<string[]> {

    return this.api.post(null, this.controller, 'getbookstatetks');
  }
}
