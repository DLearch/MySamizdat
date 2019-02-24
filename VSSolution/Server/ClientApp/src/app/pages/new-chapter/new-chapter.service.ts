import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NewChapterService {

  constructor(
    private api: ApiService
  ) { }

  create(model: { name: string, content: string, bookId: number }): Observable<number> {

    return this.api
      .post(model, 'chapter', 'add')
      .pipe(
        map(response => response.chapterId)
      );
  }
}
