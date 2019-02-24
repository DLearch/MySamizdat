import { Component, Input } from '@angular/core';
import { Comment } from '../comment';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  newCommentVisible: boolean = false;
  answersVisible: boolean = false;
  @Input() comment: Comment = null;

  constructor(
    private service: CommentsService
  ) { }
  answer(): void {
    this.newCommentVisible = true;
  }

  get comments(): Comment[] {

    return this.service.comments
      .filter(comment => comment.parentId == this.comment.id);
  }
}
