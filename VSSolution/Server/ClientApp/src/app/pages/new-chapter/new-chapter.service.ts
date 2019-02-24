import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChapterControllerService } from 'src/app/api-services/chapter-controller/chapter-controller.service';

@Injectable()
export class NewChapterService {

  constructor(
    private chapterController: ChapterControllerService
  ) { }

  create(model: { name: string, content: string, bookId: number }): Observable<number> {

    return this.chapterController.addChapter(model.name, model.content, model.bookId);
  }
}
