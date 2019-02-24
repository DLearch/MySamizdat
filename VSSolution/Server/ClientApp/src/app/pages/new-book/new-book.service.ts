import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateVM } from './create-vm';

@Injectable()
export class NewBookService {

  constructor(
    private api: ApiService
  ) { }

  create(model: CreateVM): Observable<number> {

    return this.api
      .postForm(model, 'book', 'add')
      .pipe(
        map(response => response.bookId)
      );
  }
}
