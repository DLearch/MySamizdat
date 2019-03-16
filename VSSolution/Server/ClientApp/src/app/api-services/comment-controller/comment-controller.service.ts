import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { CommentEntityType } from './comment-entity-type';
import { AddCommentRVM } from './add-comment-rvm';

@Injectable()
export class CommentControllerService {

  readonly controller: string = 'comment';

  constructor(
    private api: ApiService
  ) { }

  addComment(content: string, entityId: number, entityType: CommentEntityType, parentId: number = null): Observable<AddCommentRVM> {

    let model = {
      content: content,
      parentId: parentId,
      entityId: entityId,
      entityType: entityType
    };

    return this.api.post(model, this.controller, 'addcomment');
  }

  removeComment(commentId: number): Observable<void> {

    let model = {
      commentId: commentId
    };

    return this.api.post(model, this.controller, 'remove');
  }
}
