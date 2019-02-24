import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { Chapter } from 'src/app/models/chapter';
import { map } from 'rxjs/operators';

@Injectable()
export class ChapterService {

  constructor(
    private api: ApiService
  ) { }

  get(chapterId: number): Observable<Chapter> {

    return this.api
      .post({ chapterId: chapterId }, 'chapter', 'get')
      .pipe(
        map(response => response.chapter)
      );
  }
}
