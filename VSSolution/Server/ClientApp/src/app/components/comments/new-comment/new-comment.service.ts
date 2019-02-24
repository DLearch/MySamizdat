import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../comment';
import { CommentEntityType } from './comment-entity-type';

@Injectable()
export class NewCommentService {

  constructor(
    private api: ApiService
  ) { }

  create(content: string, entityId: number, entityType: CommentEntityType, parentId: number = 0): Observable<Comment> {
    
    return this.api
      .post({
        content: content,
        parentId: parentId,
        entityId: entityId,
        entityType: entityType,
      }, 'comment', 'create')
      .pipe(map(response => response.comment));
  }
}
