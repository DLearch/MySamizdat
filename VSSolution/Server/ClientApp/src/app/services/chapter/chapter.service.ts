import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { CreateVM } from './create-vm';
import { map } from 'rxjs/operators';
import { Chapter } from 'src/app/models/chapter';

@Injectable()
export class ChapterService {

  private readonly controller: string = 'chapter';

  constructor(
    private api: ApiService
  ) { }

  create(model: CreateVM): Observable<number> {

    return this.api
      .post(model, this.controller, 'add')
      .pipe(
        map(response => response.chapterId)
      );
  }

  get(chapterId: number): Observable<Chapter> {

    return this.api
      .post({ chapterId: chapterId }, this.controller, 'get')
      .pipe(
        map(response => response.chapter)
      );
  }
}
