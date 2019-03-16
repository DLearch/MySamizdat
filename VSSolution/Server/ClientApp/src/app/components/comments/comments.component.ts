import { Component, Input } from '@angular/core';
import { CommentEntityType } from 'src/app/api-services/comment-controller/comment-entity-type';
import { CommentControllerService } from 'src/app/api-services/comment-controller/comment-controller.service';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  @Input() comments: any[];
  @Input() entityType: CommentEntityType;
  @Input() entityId: number;

  constructor(
    private commentController: CommentControllerService,
    private userStorage: UserStorageService
  ) { }

  filterComments(id: number = null): any[] {

    if (id)
      return this.comments.filter(comment => comment.parentId == id);

    return this.comments.filter(comment => !comment.parentId);
  }

  addComment(comment: any): void {
    this.comments.push(comment);
  }
}
