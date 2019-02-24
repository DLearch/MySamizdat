import { Component } from '@angular/core';
import { CommentsService } from './comments.service';
import { Comment } from './comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  constructor(
    private service: CommentsService
  ) { }

  get comments(): Comment[] {

    return this.service.comments
      .filter(comment => !comment.parentId);
  }
}
