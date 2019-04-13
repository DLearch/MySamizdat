import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { GetChapterApiResponse } from './get-chapter-api-response';
import { UpdateChapterViewModel } from './update-chapter-view-model';

@Injectable()
export class ChapterControllerService {

  readonly controller: string = 'chapter';

  constructor(
    private api: ApiService
  ) { }

  add(name: string, bookId: number): Observable<number> {

    let model = {
      name: name,
      bookId: bookId
    };

    return this.api.post(model, this.controller, 'add');
  }

  get(chapterId: number): Observable<GetChapterApiResponse> {
    
    return this.api.post(null, this.controller, 'get', chapterId.toString());
  }

  update(chapterId: number, model: UpdateChapterViewModel): Observable<void> {

    return this.api.post(model, this.controller, 'update', chapterId.toString());
  }
}
