import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { GetChapterRVM } from './get-chapter-rvm';

@Injectable()
export class ChapterControllerService {

  readonly controller: string = 'chapter';

  constructor(
    private api: ApiService
  ) { }

  addChapter(name: string, bookId: number): Observable<number> {

    let model = {
      name: name,
      bookId: bookId
    };

    return this.api.post(model, this.controller, 'addchapter');
  }

  removeChapter(chapterId: number): Observable<void> {

    let model = {
      chapterId: chapterId
    };

    return this.api.post(model, this.controller, 'remove');
  }

  getChapter(chapterId: number): Observable<GetChapterRVM> {

    let model = {
      chapterId: chapterId
    };

    return this.api.post(model, this.controller, 'getchapter');
  }
}
