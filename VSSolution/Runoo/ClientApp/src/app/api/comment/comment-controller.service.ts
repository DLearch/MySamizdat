import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { CommentEntityType } from './comment-entity-type';
import { AddCommentApiResponse } from './add-comment-api-response';

@Injectable()
export class CommentControllerService {

  readonly controller: string = 'comment';

  constructor(
    private api: ApiService
  ) { }

  add(content: string, entityId: number, entityType: CommentEntityType, parentId: number = null): Observable<AddCommentApiResponse> {

    let model = {
      content: content,
      parentId: parentId,
      entityId: entityId,
      entityType: entityType
    };

    return this.api.post(model, this.controller, 'add');
  }
}
