import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment';
import { map } from 'rxjs/operators';
import { ChapterComment } from 'src/app/models/chapter-comment';
import { BookComment } from 'src/app/models/book-comment';

@Injectable()
export class CommentService {

  private readonly controller: string = 'comment';

  constructor(
    private api: ApiService
  ) { }

  commentBook(content: string, bookId: number, parentId: number = 0): Observable<BookComment> {

    let model: any = {
      content: content,
      bookId: bookId,
      parentId: parentId,
    };

    return this.api
      .post(model, this.controller, 'commentbook')
      .pipe(map(response => {
        model.author = response.author;
        model.creationTime = response.creationTime;
        model.parentId = response.parentId;

        return model as BookComment;
      }));
  }

  commentChapter(content: string, chapterId: number, parentId: number = 0): Observable<ChapterComment> {

    let model: any = {
      content: content,
      chapterId: chapterId,
      parentId: parentId,
    };
    
    return this.api
      .post(model, this.controller, 'commentchapter')
      .pipe(map(response => {
        model.author = response.author;
        model.creationTime = response.creationTime;
        model.parentId = response.parentId;

        return model as ChapterComment;
      }));
  }
}
