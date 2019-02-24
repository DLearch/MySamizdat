import { Injectable } from '@angular/core';
import { CommentEntityType } from './new-comment/comment-entity-type';
import { Comment } from './comment';

@Injectable()
export class CommentsService {

  comments: Comment[];
  entityType: CommentEntityType;
  entityId: number;

}
